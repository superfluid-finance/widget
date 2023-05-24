import { Address } from "abitype";
import { Command } from "./commands";
import { ValidFormValues } from "./formValues";
import { parseEther } from "viem";
import { nanoid } from "nanoid";

export const formValuesToCommands = (
  values: ValidFormValues
): ReadonlyArray<Command> => {
  const {
    network: { id: chainId },
    accountAddress,
    wrapAmountEther,
    enableAutoWrap,
    paymentOptionWithTokenInfo: { paymentOption, superToken },
  } = values;
  const wrapAmount = parseEther(wrapAmountEther ? wrapAmountEther : "0");

  const superTokenAddress = superToken.address as Address;
  const underlyingTokenAddress =
    superToken.extensions.superTokenInfo.underlyingTokenAddress;

  const commands: Command[] = [];
  if (underlyingTokenAddress) {
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
        chainId,
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
    flowRate: paymentOption.flowRate,
  })

  return Object.freeze(commands);
};
