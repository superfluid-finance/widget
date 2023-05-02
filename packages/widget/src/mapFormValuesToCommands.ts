import { Address } from "abitype";
import { Command } from "./commands";
import { ValidFormValues } from "./formValues";
import { utils } from "ethers";

const { parseEther } = utils;

export const mapValidFormToCommands = (
  values: ValidFormValues
): readonly Command[] => {
  const {
    network: { id: chainId },
    senderAddress,
    receiverAddress,
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
    if (!wrapAmount.isZero()) {
      commands.push({
        title: "Wrap into Super Tokens",
        chainId: chainId,
        superTokenAddress,
        underlyingTokenAddress,
        amountEther: wrapAmountEther, // TODO(KK): Decimals need to be accounted somewhere!
      });
    }

    if (enableAutoWrap) {
      commands.push({
        title: "Enable Auto-Wrap",
        chainId,
        superTokenAddress,
        underlyingTokenAddress,
      });
    }
  }

  commands.push({
    title: "Send Stream",
    chainId,
    superTokenAddress,
    senderAddress,
    receiverAddress,
    flowRate: paymentOption.flowRate,
  });

  return Object.freeze(commands);
};
