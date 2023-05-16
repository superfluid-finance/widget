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
  superTokenABI,
} from "superfluid-checkout-core";
import { ContractWrite, extractContractWrite } from "./extractContractWrite";
import { Children, MaxUint256 } from "./utils";
import { parseEther } from "viem";

type CommandMapperProps<TCommand extends Command = Command> = {
  command: TCommand;
  children?: (contractWrites: ContractWrite[]) => Children;
};

export function CommandMapper({ command: cmd, ...props }: CommandMapperProps) {
  switch (cmd.title) {
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
  children,
}: CommandMapperProps<EnableAutoWrapCommand>) {
  const { data } = useContractReads({
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

  const contractWrites: ContractWrite[] = [];

  if (wrapSchedule !== undefined) {
    if (wrapSchedule.strategy !== autoWrapStrategyAddress[cmd.chainId]) {
      contractWrites.push(
        extractContractWrite({
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
        })
      );
    }

    if (allowance && allowance < upperLimit) {
      contractWrites.push(
        extractContractWrite({
          abi: erc20ABI,
          functionName: "approve",
          address: cmd.underlyingTokenAddress,
          args: [autoWrapStrategyAddress[cmd.chainId], MaxUint256],
        })
      );
    }
  }

  return <>{children?.(contractWrites)}</>;
}

export function WrapIntoSuperTokensCommandMapper({
  command: cmd,
  children,
}: CommandMapperProps<WrapIntoSuperTokensCommand>) {
  // TODO(KK): Get token, check if native asset

  const { data: allowance } = useContractRead({
    chainId: cmd.chainId,
    address: cmd.underlyingTokenAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [cmd.accountAddress, cmd.superTokenAddress],
  });

  const contractWrites: ContractWrite[] = [];

  const amount = parseEther(cmd.amountEther);

  if (allowance !== undefined) {
    if (allowance < amount) {
      contractWrites.push(
        extractContractWrite({
          abi: erc20ABI,
          functionName: "approve",
          chainId: cmd.chainId,
          address: cmd.underlyingTokenAddress,
          args: [cmd.superTokenAddress, MaxUint256],
        })
      );
    }

    contractWrites.push(
      extractContractWrite({
        abi: superTokenABI,
        address: cmd.superTokenAddress,
        functionName: "upgrade", // TODO(KK): upgradeByEth
        chainId: cmd.chainId,
        args: [parseEther(cmd.amountEther)],
      })
    );
  }

  return <>{children?.(contractWrites)}</>;
}

export function SendStreamCommandMapper({
  command: cmd,
  children,
}: CommandMapperProps<SendStreamCommand>) {
  const {} = useContractRead({
    chainId: cmd.chainId,
    address: cfAv1ForwarderAddress[cmd.chainId],
    abi: cfAv1ForwarderABI,
    functionName: "getFlowrate",
    args: [cmd.superTokenAddress, cmd.accountAddress, cmd.receiverAddress],
  });

  // TODO(KK): Handle update

  const flowRate =
    parseEther(cmd.flowRate.amountEther) /
    BigInt(mapTimePeriodToSeconds(cmd.flowRate.period));

  const contractWrites: ContractWrite[] = [];

  contractWrites.push(
    extractContractWrite({
      abi: cfAv1ForwarderABI,
      address: cfAv1ForwarderAddress[cmd.chainId],
      chainId: cmd.chainId,
      functionName: "createFlow",
      args: [
        cmd.superTokenAddress,
        cmd.accountAddress,
        cmd.receiverAddress,
        flowRate,
        "0x",
      ],
    })
  );

  return <>{children?.(contractWrites)}</>;
}
