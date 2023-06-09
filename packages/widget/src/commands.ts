import { Address } from "viem";
import { ChainId, TimePeriod, autoWrapStrategyAddress } from "./core";

export type WrapIntoSuperTokensCommand = {
  id: string;
  type: "Wrap into Super Tokens";
  chainId: ChainId;
  accountAddress: Address;
  superTokenAddress: Address;
  underlyingTokenAddress: Address;
  amountEther: `${number}`;
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
  type: "Send Stream";
  chainId: ChainId;
  superTokenAddress: Address;
  accountAddress: Address;
  receiverAddress: Address;
  flowRate: {
    amountEther: `${number}`;
    period: TimePeriod;
  };
  userData: `0x${string}`;
};

export type Command =
  | WrapIntoSuperTokensCommand
  | EnableAutoWrapCommand
  | SendStreamCommand;

// export type CommandArray = Readonly<[ ...Command[], SendStreamCommand ]>;
