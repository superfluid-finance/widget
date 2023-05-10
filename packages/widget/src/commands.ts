import { Address } from "abitype";
import { ChainId, TimePeriod, autoWrapStrategyAddress } from "superfluid-checkout-core";

export type EnableAutoWrapCommand = {
  title: "Enable Auto-Wrap";
  chainId: keyof typeof autoWrapStrategyAddress;
  accountAddress: Address;
  superTokenAddress: Address;
  underlyingTokenAddress: Address;
};

export type WrapIntoSuperTokensCommand = {
  title: "Wrap into Super Tokens";
  chainId: ChainId;
  accountAddress: Address;
  superTokenAddress: Address;
  underlyingTokenAddress: Address;
  amountEther: string;
};

export type SendStreamCommand = {
  title: "Send Stream";
  chainId: ChainId;
  superTokenAddress: Address;
  accountAddress: Address;
  receiverAddress: Address;
  flowRate: {
    amountEther: string;
    period: TimePeriod;
  };
};

export type Command =
  | EnableAutoWrapCommand
  | WrapIntoSuperTokensCommand
  | SendStreamCommand;
