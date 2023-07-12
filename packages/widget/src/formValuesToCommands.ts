import { nanoid } from "nanoid";
import { Address, parseEther } from "viem";
import { Command } from "./commands";
import { autoWrapStrategyAddress } from "./core";
import { ValidFormValues } from "./formValues";

export const formValuesToCommands = (
  values: ValidFormValues,
): ReadonlyArray<Command> => {
  const {
    network: { id: chainId },
    accountAddress,
    wrapAmountEther,
    enableAutoWrap,
    flowRate,
    paymentOptionWithTokenInfo: { paymentOption, superToken },
  } = values;

  const wrapAmount = parseEther(wrapAmountEther ? wrapAmountEther : "0");

  const superTokenAddress = superToken.address as Address;

  const commands: Command[] = [];
  if (superToken.extensions.superTokenInfo.type === "Wrapper") {
    const underlyingTokenAddress =
      superToken.extensions.superTokenInfo.underlyingTokenAddress;

    if (wrapAmount !== 0n) {
      commands.push({
        id: nanoid(),
        type: "Wrap into Super Tokens",
        chainId: chainId,
        superTokenAddress,
        accountAddress,
        underlyingTokenAddress,
        amountEther: wrapAmountEther, // TODO(KK): Decimals need to be accounted somewhere!
      });
    }

    if (enableAutoWrap) {
      commands.push({
        id: nanoid(),
        type: "Enable Auto-Wrap",
        chainId: chainId as keyof typeof autoWrapStrategyAddress, // TODO(KK): validate the type in form schema
        superTokenAddress,
        accountAddress,
        underlyingTokenAddress,
      });
    }
  }

  commands.push({
    id: nanoid(),
    type: "Send Stream",
    chainId,
    superTokenAddress,
    accountAddress,
    receiverAddress: paymentOption.receiverAddress,
    flowRate: flowRate,
    userData: paymentOption.userData ?? "0x",
  });

  return Object.freeze(commands);
};
