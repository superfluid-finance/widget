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

export type SendStreamCommand = {
  id: string;
  type: "Send Stream"; // TODO(KK): This is not a fitting name anymore.
  chainId: ChainId;
  superTokenAddress: Address;
  accountAddress: Address;
  receiverAddress: Address;
  transferAmountWei: bigint; // TODO(KK): Is it better to separate to another command? IMO no.
  flowRate: {
    amountWei: bigint;
    period: TimePeriod;
  };
  userData: `0x${string}`;
};

export type Command =
  | WrapIntoSuperTokensCommand
  | EnableAutoWrapCommand
  | SendStreamCommand;

// export type CommandArray = Readonly<[ ...Command[], SendStreamCommand ]>;
