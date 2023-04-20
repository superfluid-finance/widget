import { Address } from "abitype";
import { ChainId } from "../networkDefinitions";
import TimePeriod from "./TimePeriod";

export type EnableAutoWrapCommand = {
  title: "Auto-Wrap";
  chainId: ChainId;
  superTokenAddress: Address;
  underlyingTokenAddress: Address;
};

export type WrapIntoSuperTokensCommand = {
  title: "Wrap";
  chainId: ChainId;
  superTokenAddress: Address;
  underlyingTokenAddress: Address;
  amountEther: string;
};

export type SubscribeCommand = {
  title: "Subscribe";
  chainId: ChainId;
  superTokenAddress: Address;
  senderAddress: Address;
  receiverAddress: Address;
  flowRate: {
    amountEther: string;
    period: TimePeriod;
  };
};

export type Command =
  | EnableAutoWrapCommand
  | WrapIntoSuperTokensCommand
  | SubscribeCommand;
