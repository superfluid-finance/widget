import { useContractRead, useContractReads } from "wagmi";
import {
  Command,
  EnableAutoWrapCommand,
  SendStreamCommand,
  WrapIntoSuperTokensCommand,
} from "./commands";
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
} from "./core";
import { ContractWrite } from "./ContractWrite";
import { ChildrenProp, MaxUint256 } from "./utils";
import { Abi, ContractFunctionConfig, GetValue, parseEther } from "viem";
import { useEffect, useMemo } from "react";
import { useWidget } from "./WidgetContext";
import { nanoid } from "nanoid";

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

  const superToken = getSuperToken(cmd.superTokenAddress);
  const isNativeAssetSuperToken =
    superToken.extensions.superTokenInfo.type === "Native Asset";

  const { data: allowance, isSuccess } = useContractRead(
    !isNativeAssetSuperToken
      ? {
          chainId: cmd.chainId,
          address: cmd.underlyingTokenAddress,
          abi: erc20ABI,
          functionName: "allowance",
          args: [cmd.accountAddress, cmd.superTokenAddress],
        }
      : undefined,
  );

  const amount = parseEther(cmd.amountEther);

  const contractWrites = useMemo(() => {
    const contractWrites_: ContractWrite[] = [];

    if (isNativeAssetSuperToken) {
      contractWrites_.push(
        createContractWrite({
          commandId: cmd.id,
          displayTitle: `Wrap to ${
            getUnderlyingToken(cmd.underlyingTokenAddress).symbol
          }`,
          chainId: cmd.chainId,
          abi: nativeAssetSuperTokenABI,
          functionName: "upgradeByETH",
          address: cmd.superTokenAddress,
          value: parseEther(cmd.amountEther),
        }),
      );
    } else {
      if (allowance !== undefined) {
        if (allowance < amount) {
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
              args: [cmd.superTokenAddress, MaxUint256],
            }),
          );
        }

        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: `Wrap ${
              getUnderlyingToken(cmd.underlyingTokenAddress).symbol
            } into ${getSuperToken(cmd.superTokenAddress).symbol}`,
            chainId: cmd.chainId,
            abi: superTokenABI,
            address: cmd.superTokenAddress,
            functionName: "upgrade",
            args: [parseEther(cmd.amountEther)],
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
    parseEther(cmd.flowRate.amountEther) /
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
