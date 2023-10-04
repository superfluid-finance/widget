import superfluidMetadata from "@superfluid-finance/metadata";
import { useMemo } from "react";
import { Address } from "viem";
import { fetchBalance, readContract, readContracts } from "wagmi/actions";
import { z } from "zod";

import { calculateNewFlowRate } from "./CommandMapper.js";
import { SubscribeCommand, WrapIntoSuperTokensCommand } from "./commands.js";
import {
  cfAv1ForwarderABI,
  cfAv1ForwarderAddress,
  hostABI,
  hostAddress,
  superfluidGovernanceABI,
  superTokenABI,
} from "./core/index.js";
import { calculateDateWhenBalanceCritical } from "./helpers/calculateDateWhenBalanceCritical.js";
import { calculateDepositAmount } from "./helpers/calculateDepositAmount.js";

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
                  token: cmd.underlyingToken.isNativeAsset
                    ? undefined
                    : cmd.underlyingToken.address,
                });
                return cmd.amountWeiFromUnderlyingTokenDecimals <= balance;
              },
              {
                message:
                  "You don’t have enough underlying token balance to wrap.",
              },
            )
            .optional(),
          subscribeCommand: z
            .custom<SubscribeCommand>()
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
          async ({ subscribeCommand: cmd }) => {
            const [
              [_lastUpdated, existingFlowRate, _existingDeposit, _owedDeposit],
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
              ],
            });

            const newFlowRateWei = calculateNewFlowRate({
              existingFlowRateWei: existingFlowRate,
              paymentFlowRate: cmd.flowRate,
              modifyBehaviour: cmd.flowRate.modifyBehaviour,
            });

            return newFlowRateWei != existingFlowRate;
          },
          {
            message: "You are already subscribed.",
          },
        )
        .refine(
          async ({ subscribeCommand: cmd, wrapIntoSuperTokensCommand }) => {
            const metadata = superfluidMetadata.getNetworkByChainId(
              cmd.chainId,
            )!; // TODO(KK): optimize

            const governanceAddress = await readContract({
              chainId: cmd.chainId,
              address: hostAddress[cmd.chainId],
              abi: hostABI,
              functionName: "getGovernance",
            });

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
                  address: governanceAddress,
                  abi: superfluidGovernanceABI,
                  functionName: "getSuperTokenMinimumDeposit",
                  args: [
                    metadata.contractsV1.host as Address,
                    cmd.superTokenAddress,
                  ],
                },
                {
                  chainId: cmd.chainId,
                  address: governanceAddress,
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

            const newFlowRateWei = calculateNewFlowRate({
              existingFlowRateWei: existingFlowRate,
              paymentFlowRate: cmd.flowRate,
              modifyBehaviour: cmd.flowRate.modifyBehaviour,
            });

            const newDeposit = calculateDepositAmount({
              liquidationPeriod,
              flowRate: newFlowRateWei,
              minimumDeposit,
            });

            const neededDeposit = newDeposit - existingDeposit;
            const adjustedAvailableBalance =
              availableBalance -
              cmd.transferAmountWei +
              (wrapIntoSuperTokensCommand?.amountWeiFromSuperTokenDecimals ??
                0n);

            return adjustedAvailableBalance >= neededDeposit;
          },
          {
            message:
              "You don’t have enough Super Token balance to cover buffer.",
          },
        )
        .refine(
          async ({ subscribeCommand: cmd, wrapIntoSuperTokensCommand }) => {
            const [
              accountFlowRate,
              [availableBalance, _deposit, _owedDeposit, timestamp],
              [_lastUpdated, existingFlowRate, existingDeposit, _owedDeposit2],
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
              ],
            });

            const newFlowRateWei = calculateNewFlowRate({
              existingFlowRateWei: existingFlowRate,
              paymentFlowRate: cmd.flowRate,
              modifyBehaviour: cmd.flowRate.modifyBehaviour,
            });

            const adjustedAvailableBalance =
              availableBalance -
              cmd.transferAmountWei +
              (wrapIntoSuperTokensCommand?.amountWeiFromSuperTokenDecimals ??
                0n);

            const accountFlowRateWithNewFlowRate =
              accountFlowRate - newFlowRateWei + existingFlowRate;

            const criticalDate = calculateDateWhenBalanceCritical({
              availableBalance: adjustedAvailableBalance,
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
              "You need to have Super Token balance for at least 24 hours of streaming.",
          },
        ),
    [],
  );
