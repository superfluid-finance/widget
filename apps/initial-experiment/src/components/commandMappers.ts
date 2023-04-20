import { PrepareWriteContractConfig } from "@wagmi/core";
import {
  Command,
  EnableAutoWrapCommand,
  SubscribeCommand,
  WrapIntoSuperTokensCommand,
} from "./commands";
import { useMemo } from "react";
import { extractContractWrite } from "../extractContractWrite";
import {
  autoWrapManagerABI,
  autoWrapManagerAddress,
  autoWrapStrategyAddress,
  cfAv1ForwarderABI,
  cfAv1ForwarderAddress,
  erc20ABI,
  superTokenABI,
} from "../generated";
import { BigNumber, constants, utils } from "ethers";
import { mapTimePeriodToSeconds } from "./TimePeriod";

type UseMapCommandToContractWrites<TCommand extends Command> = (
  command: TCommand
) => PrepareWriteContractConfig[];

type UseMapCommandsToContractWrites = (
  commands: Command[]
) => PrepareWriteContractConfig[];

export const useMapCommandsToContractWrites: UseMapCommandsToContractWrites = (
  commands
) => {
  return useMemo(() => {
    const calls: PrepareWriteContractConfig[] = [];

    for (const command of commands) {
      if (command.title === "Auto-Wrap") {
        calls.push(...mapEnableAutoWrapCommand(command));
      } else if (command.title === "Wrap") {
        calls.push(...mapWrapIntoSuperTokensCommand(command));
      } else if (command.title === "Subscribe") {
        calls.push(...mapSubscribeCommand(command));
      }
    }

    return calls;
  }, [commands]);
};

const mapEnableAutoWrapCommand: UseMapCommandToContractWrites<
  EnableAutoWrapCommand
> = (command: EnableAutoWrapCommand) => {
  const calls = [];

  // title: "Authorize Auto-Wrap to Wrap Tokens"

  calls.push(
    extractContractWrite({
      abi: erc20ABI,
      functionName: "approve",
      address: command.underlyingTokenAddress,
      args: [
        autoWrapStrategyAddress[command.chainId as 5],
        constants.MaxUint256,
      ],
    })
  );

  // title: "Enable Auto-Wrap"

  calls.push(
    extractContractWrite({
      abi: autoWrapManagerABI,
      address:
        autoWrapManagerAddress[
          command.chainId as keyof typeof autoWrapManagerAddress
        ],
      functionName: "createWrapSchedule",
      args: [
        command.superTokenAddress,
        autoWrapStrategyAddress[
          command.chainId as keyof typeof autoWrapStrategyAddress
        ],
        command.underlyingTokenAddress,
        BigNumber.from("3000000000"),
        BigNumber.from("172800"),
        BigNumber.from("604800"),
      ],
    })
  );

  return calls;
};

export const mapWrapIntoSuperTokensCommand: UseMapCommandToContractWrites<
  WrapIntoSuperTokensCommand
> = (command: WrapIntoSuperTokensCommand) => {
  const calls = [];

  // title: "Authorize Superfluid to Wrap Tokens",

  calls.push(
    extractContractWrite({
      abi: erc20ABI,
      functionName: "approve",
      chainId: command.chainId,
      address: command.underlyingTokenAddress,
      args: [command.superTokenAddress, constants.MaxUint256],
    })
  );

  // title: "Wrap Into Super Token",

  calls.push(
    extractContractWrite({
      abi: superTokenABI,
      address: command.superTokenAddress,
      functionName: "upgrade", // TODO(KK): upgradeByEth
      chainId: command.chainId,
      args: [utils.parseEther(command.amountEther)],
    })
  );

  return calls;
};

export const mapSubscribeCommand: UseMapCommandToContractWrites<
  SubscribeCommand
> = (command) => {
  const calls = [];

  // title: "Subscribe",

  calls.push(
    extractContractWrite({
      abi: cfAv1ForwarderABI,
      address: cfAv1ForwarderAddress[command.chainId],
      chainId: command.chainId,
      functionName: "createFlow",
      args: [
        command.superTokenAddress,
        command.senderAddress,
        command.receiverAddress,
        utils
          .parseEther(command.flowRate.amountEther)
          .div(mapTimePeriodToSeconds(command.flowRate.period)),
        "0x",
      ],
    })
  );

  return calls;
};
