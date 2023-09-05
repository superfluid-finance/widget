import { Address } from "viem";

import { autoWrapStrategyAddress, ChainId, TimePeriod } from "./core/index.js";

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
        address: undefined;
        decimals: number;
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
  };
  userData: `0x${string}`;
};

// export type BatchCallCommand = {
//   id: string;
//   type: "Batch";
//   chainId: ChainId;
//   superTokenAddress: Address;
//   innerWrites: Pick<ContractWrite, "signatureRequest" | "materializeForBatchCall">[]
// }

export type Command =
  | WrapIntoSuperTokensCommand
  | EnableAutoWrapCommand
  | SubscribeCommand;
// | BatchCallCommand;
