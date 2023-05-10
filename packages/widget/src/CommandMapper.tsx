import { useContractRead, useContractReads } from "wagmi";
import {
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
import { useEffect } from "react";
import { extractContractWrite } from "./extractContractWrite";
import { BigNumber, constants, utils } from "ethers";

const { parseEther } = utils;

export function EnableAutoWrapCommandMapper(cmd: EnableAutoWrapCommand) {
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

  const [wrapSchedule, allowance] = data ?? [];

  const upperLimit = BigNumber.from("604800");

  if (wrapSchedule) {
    if (wrapSchedule.strategy !== autoWrapStrategyAddress[cmd.chainId]) {
      extractContractWrite({
        abi: autoWrapManagerABI,
        address: autoWrapManagerAddress[cmd.chainId],
        functionName: "createWrapSchedule",
        args: [
          cmd.superTokenAddress,
          autoWrapStrategyAddress[cmd.chainId],
          cmd.underlyingTokenAddress,
          BigNumber.from("3000000000"),
          BigNumber.from("172800"),
          BigNumber.from("604800"),
        ],
      });
    }

    if (allowance && allowance.lt(upperLimit)) {
      extractContractWrite({
        abi: erc20ABI,
        functionName: "approve",
        address: cmd.underlyingTokenAddress,
        args: [autoWrapStrategyAddress[cmd.chainId], constants.MaxUint256],
      });
    }
  }

  return null;
}

export function WrapIntoSuperTokensCommandMapper(
  cmd: WrapIntoSuperTokensCommand
) {
  // TODO(KK): Get token, check if native asset

  const { data: allowance } = useContractRead({
    chainId: cmd.chainId,
    address: cmd.underlyingTokenAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [cmd.accountAddress, cmd.superTokenAddress],
  });

  const amount = parseEther(cmd.amountEther);
  if (allowance) {
    if (allowance.lt(amount)) {
      extractContractWrite({
        abi: erc20ABI,
        functionName: "approve",
        chainId: cmd.chainId,
        address: cmd.underlyingTokenAddress,
        args: [cmd.superTokenAddress, constants.MaxUint256],
      });
    }

    extractContractWrite({
      abi: superTokenABI,
      address: cmd.superTokenAddress,
      functionName: "upgrade", // TODO(KK): upgradeByEth
      chainId: cmd.chainId,
      args: [parseEther(cmd.amountEther)],
    });
  }

  return null;
}

export function SendStreamCommandMapper(cmd: SendStreamCommand) {
  const {} = useContractRead({
    chainId: cmd.chainId,
    address: cfAv1ForwarderAddress[cmd.chainId],
    abi: cfAv1ForwarderABI,
    functionName: "getFlowrate",
    args: [cmd.superTokenAddress, cmd.accountAddress, cmd.receiverAddress],
  });

  // TODO(KK): Handle update

  extractContractWrite({
    abi: cfAv1ForwarderABI,
    address: cfAv1ForwarderAddress[cmd.chainId],
    chainId: cmd.chainId,
    functionName: "createFlow",
    args: [
      cmd.superTokenAddress,
      cmd.accountAddress,
      cmd.receiverAddress,
      utils
        .parseEther(cmd.flowRate.amountEther)
        .div(mapTimePeriodToSeconds(cmd.flowRate.period)),
      "0x",
    ],
  });

  return null;
}
