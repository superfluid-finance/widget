import { Address, zeroAddress } from "viem";

import {
  autoWrapStrategyAddress,
  ChainId,
  ModifyFlowRateBehaviour,
  TimePeriod,
} from "./core/index.js";

export type WrapIntoSuperTokensCommand = {
  id: string;
  type: "Wrap into Super Tokens";
  chainId: ChainId;
  accountAddress: Address;
  superTokenAddress: Address;
  underlyingToken:
    | {
        isNativeAsset: false;
        address: Address;
        decimals: number;
      }
    | {
        isNativeAsset: true;
        address: typeof zeroAddress;
        decimals: 18;
      };
  amountInUnits: `${number}`;
  amountWeiFromSuperTokenDecimals: bigint;
  amountWeiFromUnderlyingTokenDecimals: bigint;
};

export type EnableAutoWrapCommand = {
  id: string;
  type: "Enable Auto-Wrap";
  chainId: keyof typeof autoWrapStrategyAddress;
  accountAddress: Address;
  superTokenAddress: Address;
  underlyingTokenAddress: Address;
};

export type SubscribeCommand = {
  id: string;
  type: "Subscribe";
  chainId: ChainId;
  superTokenAddress: Address;
  accountAddress: Address;
  receiverAddress: Address;
  transferAmountWei: bigint;
  flowRate: {
    amountWei: bigint;
    period: TimePeriod;
    modifyBehaviour: ModifyFlowRateBehaviour;
  };
  userData: `0x${string}`;
};

export type Command =
  | WrapIntoSuperTokensCommand
  | EnableAutoWrapCommand
  | SubscribeCommand;
