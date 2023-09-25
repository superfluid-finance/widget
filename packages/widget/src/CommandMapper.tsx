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
  nativeAssetSuperTokenABI,
  superTokenABI,
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
              getUnderlyingToken(cmd.underlyingTokenAddress).symbol
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
    !isNativeAssetUnderlyingToken
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
            getSuperToken(cmd.superTokenAddress).symbol
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
                getUnderlyingToken(cmd.underlyingToken.address).symbol
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
              getUnderlyingToken(cmd.underlyingToken.address).symbol
            } into ${getSuperToken(cmd.superTokenAddress).symbol}`,
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

export function SubscribeCommandMapper({
  command: cmd,
  onMapped,
}: CommandMapperProps<SubscribeCommand>) {
  const {
    paymentDetails: { attemptIdempotency },
  } = useWidget();

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

  const flowRate =
    cmd.flowRate.amountWei /
    BigInt(mapTimePeriodToSeconds(cmd.flowRate.period));

  const checkExistingUpfrontTransfer =
    attemptIdempotency ?? cmd.transferAmountWei > 0n;
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
        fromBlock: blockNumber - 10_000n, // 10k is Alchemy limit, some places have 50k. Move into environment variable?
      });
      return logs;
    },
    {
      enabled: checkExistingUpfrontTransfer && isSuccessForBlockNumber,
    },
  );

  const skipTransfer = useMemo(() => {
    if (checkExistingUpfrontTransfer && isSuccessForTransferEvents) {
      return transferEvents!.filter(
        (e) => !e.removed && e.args.value === cmd.transferAmountWei,
      );
      // TODO(KK): Figure out whether should try to match one log event or should sum together all the transfers?
    } else {
      return false;
    }
  }, [checkExistingUpfrontTransfer, isSuccessForTransferEvents]);

  const didAllQueriesSucceed = useMemo(
    () =>
      !isLoadingForGetFlowRate &&
      isSuccessForGetFlowRate &&
      (isIdleForBlockNumber || isSuccessForBlockNumber) &&
      (isIdleForTransferEvents || isSuccessForTransferEvents),
    [
      isLoadingForGetFlowRate,
      isSuccessForGetFlowRate,
      isIdleForBlockNumber,
      isSuccessForBlockNumber,
      isIdleForTransferEvents,
      isSuccessForTransferEvents,
    ],
  );

  const contractWrites = useMemo(() => {
    const contractWrites_: ContractWrite[] = [];
    if (!didAllQueriesSucceed) {
      return contractWrites_;
    }

    if (existingFlowRate_ !== undefined) {
      const existingFlowRate = BigInt(existingFlowRate_);

      if (cmd.transferAmountWei > 0n && !skipTransfer) {
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
        if (attemptIdempotency) {
          if (existingFlowRate < flowRate) {
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
                  flowRate,
                  cmd.userData,
                ],
              }),
            );
          }
        } else {
          const updatedFlowRate = existingFlowRate + flowRate;
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
                updatedFlowRate,
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
              flowRate,
              cmd.userData,
            ],
          }),
        );
      }
    }

    return contractWrites_;
  }, [cmd.id, didAllQueriesSucceed]);

  useEffect(
    () =>
      didAllQueriesSucceed
        ? onMapped?.({ commandId: cmd.id, contractWrites })
        : void 0,
    [cmd.id, contractWrites, didAllQueriesSucceed],
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
