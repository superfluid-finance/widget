import { nanoid } from "nanoid";
import { Address, parseEther } from "viem";
import { Command } from "./commands";
import { autoWrapStrategyAddress } from "./core";
import { ValidFormValues } from "./formValues";

export const formValuesToCommands = (
  values: ValidFormValues
): ReadonlyArray<Command> => {
  const {
    network: { id: chainId },
    accountAddress,
    wrapAmountEther,
    enableAutoWrap,
    customPaymentAmount,
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

  // Open ended payment options do not have flow rate so we ask user to specify one.
  // There is a moment where flow rate is missing but user should not reach this point without specifying one.
  const finalFlowRate = paymentOption.flowRate || customPaymentAmount;

  if (!finalFlowRate) {
    throw new Error("Can't check out without specified flow rate!");
  }

  commands.push({
    id: nanoid(),
    type: "Send Stream",
    chainId,
    superTokenAddress,
    accountAddress,
    receiverAddress: paymentOption.receiverAddress,
    flowRate: finalFlowRate,
    userData: paymentOption.userData ?? "0x",
  });

  return Object.freeze(commands);
};
