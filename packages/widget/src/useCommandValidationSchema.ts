import { useMemo } from "react";
import { z } from "zod";
import { SendStreamCommand, WrapIntoSuperTokensCommand } from "./commands";
import {
  cfAv1ForwarderABI,
  cfAv1ForwarderAddress,
  mapTimePeriodToSeconds,
  superTokenABI,
  superfluidGovernanceABI,
  superfluidGovernanceAddress,
} from "./core";
import { fetchBalance, readContracts } from "wagmi/actions";
import { calculateDateWhenBalanceCritical } from "./helpers/calculateDateWhenBalanceCritical";
import { calculateDepositAmount } from "./helpers/calculateDepositAmount";
import superfluidMetadata from "@superfluid-finance/metadata";
import { Address } from "viem";

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
            const metadata = superfluidMetadata.getNetworkByChainId(
              cmd.chainId,
            )!; // TODO(KK): optimize

            const [
              [_lastUpdated, existingFlowRate, existingDeposit, _owedDeposit],
              minimumDeposit,
              [liquidationPeriod, _patricianPeriod],
            ] = await readContracts({
              allowFailure: false,
              contracts: [
                {
                  chainId: cmd.chainId,
                  address: cfAv1ForwarderAddress[cmd.chainId],
                  abi: cfAv1ForwarderABI,
                  functionName: "getFlowInfo",
                  args: [
                    cmd.superTokenAddress,
                    cmd.accountAddress,
                    cmd.receiverAddress,
                  ],
                },
                {
                  chainId: cmd.chainId,
                  address: superfluidGovernanceAddress[cmd.chainId],
                  abi: superfluidGovernanceABI,
                  functionName: "getSuperTokenMinimumDeposit",
                  args: [
                    metadata.contractsV1.host as Address,
                    cmd.superTokenAddress,
                  ],
                },
                {
                  chainId: cmd.chainId,
                  address: superfluidGovernanceAddress[cmd.chainId],
                  abi: superfluidGovernanceABI,
                  functionName: "getPPPConfig",
                  args: [
                    metadata.contractsV1.host as Address,
                    cmd.superTokenAddress,
                  ],
                },
              ],
            });

            // TODO(KK): Probably no need to force into multi-call because this is very likely cached already.
            const { value: availableBalance } = await fetchBalance({
              chainId: cmd.chainId,
              address: cmd.accountAddress,
              token: cmd.superTokenAddress,
            });

            // TODO(KK): refactor into helper function
            const newFlowRate =
              existingFlowRate +
              cmd.flowRate.amountWei /
                mapTimePeriodToSeconds(cmd.flowRate.period);

            const newDeposit = calculateDepositAmount({
              liquidationPeriod,
              flowRate: newFlowRate,
              minimumDeposit,
            });

            const neededDeposit = newDeposit - existingDeposit;
            const availableBalanceWithWrapAmount =
              availableBalance + (wrapIntoSuperTokensCommand?.amountWei ?? 0n);

            return availableBalanceWithWrapAmount >= neededDeposit;
          },
          {
            message: "Not enough balance for buffer.",
          },
        )
        .refine(
          async ({ sendStreamCommand: cmd, wrapIntoSuperTokensCommand }) => {
            const [
              accountFlowRate,
              [availableBalance, _deposit, _owedDeposit, timestamp],
            ] = await readContracts({
              allowFailure: false,
              contracts: [
                {
                  chainId: cmd.chainId,
                  abi: cfAv1ForwarderABI,
                  address: cfAv1ForwarderAddress[cmd.chainId],
                  functionName: "getAccountFlowrate",
                  args: [cmd.superTokenAddress, cmd.accountAddress],
                },
                {
                  chainId: cmd.chainId,
                  abi: superTokenABI,
                  functionName: "realtimeBalanceOfNow",
                  address: cmd.superTokenAddress,
                  args: [cmd.accountAddress],
                },
              ],
            });

            const flowRateWeiPerSecond =
              cmd.flowRate.amountWei /
              mapTimePeriodToSeconds(cmd.flowRate.period);

            const availableBalanceWithWrapAmount =
              availableBalance + (wrapIntoSuperTokensCommand?.amountWei ?? 0n);
            const accountFlowRateWithNewFlowRate =
              accountFlowRate - flowRateWeiPerSecond;

            const criticalDate = calculateDateWhenBalanceCritical({
              availableBalance: availableBalanceWithWrapAmount,
              timestamp,
              accountFlowRate: accountFlowRateWithNewFlowRate,
            });

            if (!criticalDate) {
              return true;
            }

            const secondsToCritical = Math.round(
              (criticalDate.getTime() - Date.now()) / 1000,
            );

            const SECONDS_IN_DAY = 86400n;
            return secondsToCritical > SECONDS_IN_DAY;
          },
          {
            message:
              "Need to leave 24 hour worth of balance in the Super Token.",
          },
        ),
    [],
  );
