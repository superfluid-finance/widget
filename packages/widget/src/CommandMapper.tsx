import { nanoid } from "nanoid";
import { useEffect, useMemo } from "react";
import { Abi, ContractFunctionConfig, GetValue } from "viem";
import { useContractRead, useContractReads } from "wagmi";

import {
  Command,
  EnableAutoWrapCommand,
  SendStreamCommand,
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
import { ChildrenProp, MaxUint256 } from "./utils.js";
import { useWidget } from "./WidgetContext.js";

type CommandMapperProps<TCommand extends Command = Command> = {
  command: TCommand;
  onMapped?: (contractWrites: ReadonlyArray<ContractWrite>) => void;
  children?: (contractWrites: ReadonlyArray<ContractWrite>) => ChildrenProp;
};

export function CommandMapper({ command: cmd, ...props }: CommandMapperProps) {
  switch (cmd.type) {
    case "Enable Auto-Wrap":
      return <EnableAutoWrapCommandMapper command={cmd} {...props} />;
    case "Wrap into Super Tokens":
      return <WrapIntoSuperTokensCommandMapper command={cmd} {...props} />;
    case "Send Stream":
      return <SendStreamCommandMapper command={cmd} {...props} />;
  }
}

export function EnableAutoWrapCommandMapper({
  command: cmd,
  onMapped,
  children,
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
    () => (isSuccess ? onMapped?.(contractWrites) : void 0),
    [contractWrites],
  );

  return <>{children?.(contractWrites)}</>;
}

export function WrapIntoSuperTokensCommandMapper({
  command: cmd,
  onMapped,
  children,
}: CommandMapperProps<WrapIntoSuperTokensCommand>) {
  const { getSuperToken, getUnderlyingToken } = useWidget();

  const isNativeAssetUnderlyingToken = cmd.underlyingToken.isNativeAsset;

  const { data: allowance, isSuccess } = useContractRead(
    !isNativeAssetUnderlyingToken
      ? {
          chainId: cmd.chainId,
          address: cmd.underlyingToken.address,
          abi: erc20ABI,
          functionName: "allowance",
          args: [cmd.accountAddress, cmd.superTokenAddress],
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
      if (allowance !== undefined) {
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
    () => (isSuccess ? onMapped?.(contractWrites) : void 0),
    [contractWrites],
  );

  return <>{children?.(contractWrites)}</>;
}

export function SendStreamCommandMapper({
  command: cmd,
  onMapped,
  children,
}: CommandMapperProps<SendStreamCommand>) {
  const { isSuccess, data: existingFlowRate } = useContractRead({
    chainId: cmd.chainId,
    address: cfAv1ForwarderAddress[cmd.chainId],
    abi: cfAv1ForwarderABI,
    functionName: "getFlowrate",
    args: [cmd.superTokenAddress, cmd.accountAddress, cmd.receiverAddress],
  });

  const flowRate =
    cmd.flowRate.amountWei /
    BigInt(mapTimePeriodToSeconds(cmd.flowRate.period));

  const contractWrites = useMemo(() => {
    const contractWrites_: ContractWrite[] = [];

    if (existingFlowRate !== undefined) {
      if (existingFlowRate > 0n) {
        const updatedFlowRate = existingFlowRate + flowRate;

        // TODO(KK): Is this the right behaviour, to update the flow rate?
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
  }, [cmd.id, isSuccess]);

  useEffect(
    () => (isSuccess ? onMapped?.(contractWrites) : void 0),
    [contractWrites],
  );

  return <>{children?.(contractWrites)}</>;
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
    ...arg,
  }) as ContractWrite;
