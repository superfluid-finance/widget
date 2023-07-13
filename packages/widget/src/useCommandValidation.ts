import { useMemo } from "react";
import { z } from "zod";
import { SendStreamCommand, WrapIntoSuperTokensCommand } from "./commands";
import {
  cfAv1ForwarderABI,
  cfAv1ForwarderAddress,
  mapTimePeriodToSeconds,
  superTokenABI,
} from "./core";
import { fetchBalance, readContract } from "wagmi/actions";
import { calculateDateWhenBalanceCritical } from "./helpers/calculateDateWhenBalanceCritical";

export const useCommandValidationSchema = () =>
  useMemo(
    () =>
      z
        .object({
          wrapIntoSuperTokensCommand: z
            .custom<WrapIntoSuperTokensCommand>()
            .refine(
              async (cmd) => {
                const { value: balance } = await fetchBalance({
                  chainId: cmd.chainId,
                  address: cmd.accountAddress,
                  token: cmd.isNativeAssetSuperToken
                    ? undefined
                    : cmd.underlyingTokenAddress,
                });
                return cmd.amountWei <= balance;
              },
              {
                message: "Insufficient balance for wrapping.",
              },
            )
            .optional(),
          sendStreamCommand: z
            .custom<SendStreamCommand>()
            .refine(
              (x) =>
                x.accountAddress.toLowerCase() !==
                x.receiverAddress.toLowerCase(),
              {
                message: "You can't stream to yourself.",
              },
            ),
        })
        .refine(
          async ({ sendStreamCommand: cmd, wrapIntoSuperTokensCommand }) => {
            const [availableBalance, _deposit, _owedDeposit, timestamp] =
              await readContract({
                chainId: cmd.chainId,
                abi: superTokenABI,
                functionName: "realtimeBalanceOfNow",
                address: cmd.superTokenAddress,
                args: [cmd.accountAddress],
              });
            const accountFlowRate = await readContract({
              chainId: cmd.chainId,
              abi: cfAv1ForwarderABI,
              address: cfAv1ForwarderAddress[cmd.chainId],
              functionName: "getAccountFlowrate",
              args: [cmd.superTokenAddress, cmd.accountAddress],
            });

            const flowRateWeiPerSecond =
              cmd.flowRate.amountWei /
              BigInt(mapTimePeriodToSeconds(cmd.flowRate.period));

            const availableBalanceWithWrapAmount =
              availableBalance + (wrapIntoSuperTokensCommand?.amountWei ?? 0n);
            const accountFlowRateWithNewFlowRate =
              accountFlowRate + flowRateWeiPerSecond;

            const criticalDate = calculateDateWhenBalanceCritical({
              availableBalance: availableBalanceWithWrapAmount,
              timestamp,
              accountFlowRate: accountFlowRateWithNewFlowRate,
            });

            if (!criticalDate) {
              return true;
            }

            const secondsToCritical = Math.round(
              (Date.now() - criticalDate.getTime()) / 1000,
            );

            // Account for initial wrap.
            const SECONDS_IN_DAY = 86400n;
            return secondsToCritical < SECONDS_IN_DAY;
          },
          {
            message:
              "Need to leave 24 hour worth of balance in the Super Token.",
          },
        ),
    [],
  );
