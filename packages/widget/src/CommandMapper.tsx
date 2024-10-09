import { nanoid } from "nanoid";
import { useEffect, useMemo } from "react";
import { Abi, ContractFunctionConfig, getAbiItem, GetValue } from "viem";
import {
  useBlockNumber,
  useContractRead,
  useContractReads,
  usePublicClient,
  useQuery,
} from "wagmi";

import {
  Command,
  EnableAutoWrapCommand,
  SubscribeCommand,
  WrapIntoSuperTokensCommand,
} from "./commands.js";
import { ContractWrite } from "./ContractWrite.js";
import {
  autoWrapManagerABI,
  autoWrapManagerAddress,
  autoWrapStrategyAddress,
  cfAv1ForwarderABI,
  cfAv1ForwarderAddress,
  erc20ABI,
  mapTimePeriodToSeconds,
  ModifyFlowRateBehaviour,
  nativeAssetSuperTokenABI,
  superTokenABI,
  TimePeriod,
} from "./core/index.js";
import { MaxUint256 } from "./utils.js";
import { useWidget } from "./WidgetContext.js";

export type CommandMapperProps<TCommand extends Command = Command> = {
  command: TCommand;
  onMapped?: (result: {
    commandId: string;
    contractWrites: ReadonlyArray<ContractWrite>;
  }) => void;
};

export function CommandMapper({ command: cmd, ...props }: CommandMapperProps) {
  switch (cmd.type) {
    case "Enable Auto-Wrap":
      return <EnableAutoWrapCommandMapper command={cmd} {...props} />;
    case "Wrap into Super Tokens":
      return <WrapIntoSuperTokensCommandMapper command={cmd} {...props} />;
    case "Subscribe":
      return <SubscribeCommandMapper command={cmd} {...props} />;
  }
}

export function EnableAutoWrapCommandMapper({
  command: cmd,
  onMapped,
}: CommandMapperProps<EnableAutoWrapCommand>) {
  const { getUnderlyingToken } = useWidget();

  const { data, isSuccess } = useContractReads({
    contracts: [
      {
        chainId: cmd.chainId,
        address: autoWrapManagerAddress[cmd.chainId],
        abi: autoWrapManagerABI,
        functionName: "getWrapSchedule",
        args: [
          cmd.accountAddress,
          cmd.superTokenAddress,
          cmd.underlyingTokenAddress,
        ],
      },
      {
        chainId: cmd.chainId,
        address: cmd.underlyingTokenAddress,
        abi: erc20ABI,
        functionName: "allowance",
        args: [cmd.accountAddress, autoWrapStrategyAddress[cmd.chainId]],
      },
    ],
    cacheOnBlock: true,
  });

  const [wrapScheduleData, allowanceData] = data ?? [];
  const wrapSchedule = wrapScheduleData?.result;
  const allowance = allowanceData?.result;

  const upperLimit = 604800n;

  const contractWrites = useMemo(() => {
    const contractWrites_: ContractWrite[] = [];

    if (typeof wrapSchedule === "object") {
      if (wrapSchedule.strategy !== autoWrapStrategyAddress[cmd.chainId]) {
        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: "Enable Auto-Wrap",
            chainId: cmd.chainId,
            abi: autoWrapManagerABI,
            address: autoWrapManagerAddress[cmd.chainId],
            functionName: "createWrapSchedule",
            args: [
              cmd.superTokenAddress,
              autoWrapStrategyAddress[cmd.chainId],
              cmd.underlyingTokenAddress,
              3000000000n,
              172800n,
              604800n,
            ],
          }),
        );
      }

      if (typeof allowance === "bigint" && allowance < upperLimit) {
        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: `Approve ${
              getUnderlyingToken(cmd.chainId, cmd.underlyingTokenAddress).symbol
            } Allowance`,
            chainId: cmd.chainId,
            abi: erc20ABI,
            functionName: "approve",
            address: cmd.underlyingTokenAddress,
            args: [autoWrapStrategyAddress[cmd.chainId], MaxUint256],
          }),
        );
      }
    }
    return contractWrites_;
  }, [cmd.id, isSuccess]);

  useEffect(
    () =>
      isSuccess ? onMapped?.({ commandId: cmd.id, contractWrites }) : void 0,
    [cmd.id, contractWrites, isSuccess],
  );

  return null;
}

export function WrapIntoSuperTokensCommandMapper({
  command: cmd,
  onMapped,
}: CommandMapperProps<WrapIntoSuperTokensCommand>) {
  const { getSuperToken, getUnderlyingToken } = useWidget();

  const isNativeAssetUnderlyingToken = cmd.underlyingToken.isNativeAsset;

  const { data: allowance_, isSuccess } = useContractRead(
    !isNativeAssetUnderlyingToken // ERC-20 allowance doesn't apply to native asset tokens
      ? {
          chainId: cmd.chainId,
          address: cmd.underlyingToken.address,
          abi: erc20ABI,
          functionName: "allowance",
          args: [cmd.accountAddress, cmd.superTokenAddress],
          cacheOnBlock: true,
        }
      : undefined,
  );

  const contractWrites = useMemo(() => {
    const contractWrites_: ContractWrite[] = [];

    if (isNativeAssetUnderlyingToken) {
      contractWrites_.push(
        createContractWrite({
          commandId: cmd.id,
          displayTitle: `Wrap to ${
            getSuperToken(cmd.chainId, cmd.superTokenAddress).symbol
          }`,
          chainId: cmd.chainId,
          abi: nativeAssetSuperTokenABI,
          functionName: "upgradeByETH",
          address: cmd.superTokenAddress,
          value: cmd.amountWeiFromUnderlyingTokenDecimals,
        }),
      );
    } else {
      if (allowance_ !== undefined) {
        const allowance = BigInt(allowance_);
        if (allowance < cmd.amountWeiFromUnderlyingTokenDecimals) {
          contractWrites_.push(
            createContractWrite({
              commandId: cmd.id,
              displayTitle: `Approve ${
                getUnderlyingToken(cmd.chainId, cmd.underlyingToken.address)
                  .symbol
              } Allowance`,
              chainId: cmd.chainId,
              abi: erc20ABI,
              functionName: "approve",
              address: cmd.underlyingToken.address,
              args: [
                cmd.superTokenAddress,
                cmd.amountWeiFromUnderlyingTokenDecimals,
              ],
            }),
          );
        }

        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: `Wrap ${
              getUnderlyingToken(cmd.chainId, cmd.underlyingToken.address)
                .symbol
            } into ${getSuperToken(cmd.chainId, cmd.superTokenAddress).symbol}`,
            chainId: cmd.chainId,
            abi: superTokenABI,
            address: cmd.superTokenAddress,
            functionName: "upgrade",
            args: [cmd.amountWeiFromSuperTokenDecimals],
          }),
        );
      }
    }

    return contractWrites_;
  }, [cmd.id, isSuccess]);

  useEffect(
    () =>
      isSuccess ? onMapped?.({ commandId: cmd.id, contractWrites }) : void 0,
    [cmd.id, contractWrites, isSuccess],
  );

  return null;
}

const transferEventAbi = getAbiItem({ abi: superTokenABI, name: "Transfer" });

export const calculateNewFlowRate = ({
  existingFlowRateWei: existingFlowRate,
  paymentFlowRate,
  modifyBehaviour,
}: {
  existingFlowRateWei: bigint;
  paymentFlowRate: {
    amountWei: bigint;
    period: TimePeriod;
  };
  modifyBehaviour: ModifyFlowRateBehaviour;
}): bigint => {
  const paymentFlowRateWei =
    paymentFlowRate.amountWei /
    BigInt(mapTimePeriodToSeconds(paymentFlowRate.period));

  switch (modifyBehaviour) {
    case "ADD":
      return existingFlowRate + paymentFlowRateWei;
    case "ENSURE":
      if (existingFlowRate > paymentFlowRateWei) {
        return existingFlowRate;
      }
      return existingFlowRate > paymentFlowRateWei
        ? existingFlowRate
        : paymentFlowRateWei;
    case "SET":
    default:
      return paymentFlowRateWei;
  }
};

export function SubscribeCommandMapper({
  command: cmd,
  onMapped,
}: CommandMapperProps<SubscribeCommand>) {
  const {
    isSuccess: isSuccessForGetFlowRate,
    isLoading: isLoadingForGetFlowRate,
    data: existingFlowRate_,
  } = useContractRead({
    chainId: cmd.chainId,
    address: cfAv1ForwarderAddress[cmd.chainId],
    abi: cfAv1ForwarderABI,
    functionName: "getFlowrate",
    args: [cmd.superTokenAddress, cmd.accountAddress, cmd.receiverAddress],
    cacheOnBlock: true,
  });

  const checkExistingUpfrontTransfer = cmd.transferAmountWei > 0n;
  const {
    isSuccess: isSuccessForBlockNumber,
    isIdle: isIdleForBlockNumber,
    data: blockNumber,
  } = useBlockNumber({
    chainId: cmd.chainId,
    enabled: checkExistingUpfrontTransfer,
  });

  const publicClient = usePublicClient({
    chainId: cmd.chainId,
  });
  const {
    isSuccess: isSuccessForTransferEvents,
    isLoading: isLoadingForTransferEvents,
    isIdle: isIdleForTransferEvents,
    data: transferEvents,
  } = useQuery(
    [cmd.id, blockNumber],
    async () => {
      if (blockNumber === undefined)
        throw new Error("The query should not run without the block number.");

      const logs = await publicClient.getLogs({
        event: transferEventAbi,
        address: cmd.superTokenAddress,
        args: {
          from: cmd.accountAddress,
          to: cmd.receiverAddress,
        },
        strict: true,
        toBlock: blockNumber,
        fromBlock: blockNumber - 5_000n, // 10k is Alchemy limit, some places have 50k. Ankr has 5k. Move into environment variable?
      });
      return logs;
    },
    {
      enabled: checkExistingUpfrontTransfer && isSuccessForBlockNumber,
      retry: 10,
    },
  );

  const skipTransfer = useMemo(() => {
    if (checkExistingUpfrontTransfer && isSuccessForTransferEvents) {
      // Check if there's already been a transfer with the upfront payment amount.
      // Decided to approach it by looking for the exact transfer amount, instead of summing up the transfers.
      // The main reason for this feature is to avoid accidental double-charging of brand new users and checking for the exact transfer amount seems sufficient.
      // More complex scenarios will need manual intervention and customer support.
      return transferEvents!.some(
        (e) => !e.removed && e.args.value === cmd.transferAmountWei,
      );
    } else {
      return false;
    }
  }, [checkExistingUpfrontTransfer, isSuccessForTransferEvents]);

  const didAllQueriesFinish = useMemo(
    () =>
      !isLoadingForGetFlowRate &&
      isSuccessForGetFlowRate &&
      (isIdleForBlockNumber || isSuccessForBlockNumber) &&
      (isIdleForTransferEvents || !isLoadingForTransferEvents), // Keep the check for transfer events non-blocking.
    [
      isLoadingForGetFlowRate,
      isSuccessForGetFlowRate,
      isIdleForBlockNumber,
      isSuccessForBlockNumber,
      isIdleForTransferEvents,
      isSuccessForTransferEvents,
    ],
  );

  const contractWrites = useMemo<ContractWrite[]>(() => {
    if (!didAllQueriesFinish) {
      return [];
    }

    const contractWrites_: ContractWrite[] = [];
    if (existingFlowRate_ !== undefined) {
      const existingFlowRate = BigInt(existingFlowRate_);

      const newFlowRate = calculateNewFlowRate({
        existingFlowRateWei: existingFlowRate,
        paymentFlowRate: cmd.flowRate,
        modifyBehaviour: cmd.flowRate.modifyBehaviour,
      });

      if (!skipTransfer && cmd.transferAmountWei > 0n) {
        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: "Transfer",
            abi: erc20ABI,
            address: cmd.superTokenAddress,
            chainId: cmd.chainId,
            functionName: "transfer",
            args: [cmd.receiverAddress, cmd.transferAmountWei],
          }),
        );
      }

      if (existingFlowRate > 0n) {
        // Only set a contract write if the new flow rate is different.
        if (existingFlowRate !== newFlowRate) {
          contractWrites_.push(
            createContractWrite({
              commandId: cmd.id,
              displayTitle: "Modify Stream",
              abi: cfAv1ForwarderABI,
              address: cfAv1ForwarderAddress[cmd.chainId],
              chainId: cmd.chainId,
              functionName: "updateFlow",
              args: [
                cmd.superTokenAddress,
                cmd.accountAddress,
                cmd.receiverAddress,
                newFlowRate,
                cmd.userData,
              ],
            }),
          );
        }
      } else {
        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: "Send Stream",
            abi: cfAv1ForwarderABI,
            address: cfAv1ForwarderAddress[cmd.chainId],
            chainId: cmd.chainId,
            functionName: "createFlow",
            args: [
              cmd.superTokenAddress,
              cmd.accountAddress,
              cmd.receiverAddress,
              newFlowRate,
              cmd.userData,
            ],
          }),
        );
      }
    }

    return contractWrites_;
  }, [cmd.id, didAllQueriesFinish]);

  useEffect(
    () =>
      didAllQueriesFinish
        ? onMapped?.({ commandId: cmd.id, contractWrites })
        : void 0,
    [cmd.id, contractWrites, didAllQueriesFinish],
  );

  return null;
}

const createContractWrite = <
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
>(
  arg: ContractFunctionConfig<TAbi, TFunctionName, "payable" | "nonpayable"> &
    GetValue<TAbi, TFunctionName> &
    Pick<ContractWrite, "commandId" | "displayTitle" | "chainId">,
): ContractWrite =>
  ({
    id: nanoid(),
    value: 0n, // Gnosis Safe has a bug that required "value" to be specified: https://github.com/wagmi-dev/wagmi/issues/2887
    ...arg,
  }) as ContractWrite;
