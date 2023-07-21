import { nanoid } from "nanoid";
import { Address, parseEther, parseUnits } from "viem";

import { Command } from "./commands.js";
import { autoWrapStrategyAddress } from "./core/index.js";
import { ValidFormValues } from "./formValues.js";

export const formValuesToCommands = (
  values: ValidFormValues,
): ReadonlyArray<Command> => {
  const {
    network: { id: chainId },
    accountAddress,
    wrapAmountInUnits,
    enableAutoWrap,
    flowRate,
    paymentOptionWithTokenInfo: {
      paymentOption,
      superToken,
      underlyingToken: underlyingTokenInfo,
    },
  } = values;

  const superTokenAddress = superToken.address as Address;

  const commands: Command[] = [];

  const isWrapperSuperToken =
    superToken.extensions.superTokenInfo.type === "Wrapper";
  const _isNativeAssetSuperToken =
    superToken.extensions.superTokenInfo.type === "Native Asset";

  // TODO(KK): Clean-up the bangs.

  if (isWrapperSuperToken) {
    const wrapAmount = parseUnits(
      wrapAmountInUnits ? wrapAmountInUnits : "0",
      underlyingTokenInfo!.decimals,
    );

    const underlyingToken = isWrapperSuperToken
      ? ({
          isNativeAsset: false,
          address: superToken.extensions.superTokenInfo.underlyingTokenAddress,
          decimals: underlyingTokenInfo!.decimals,
        } as const)
      : ({
          isNativeAsset: true,
          address: undefined,
          decimals: underlyingTokenInfo!.decimals,
        } as const);

    if (wrapAmount !== 0n) {
      commands.push({
        id: nanoid(),
        type: "Wrap into Super Tokens",
        chainId: chainId,
        superTokenAddress,
        accountAddress,
        underlyingToken,
        amountWei: wrapAmount,
      });
    }

    if (enableAutoWrap && underlyingToken?.address) {
      commands.push({
        id: nanoid(),
        type: "Enable Auto-Wrap",
        chainId: chainId as keyof typeof autoWrapStrategyAddress, // TODO(KK): validate the type in form schema
        superTokenAddress,
        accountAddress,
        underlyingTokenAddress: underlyingToken.address,
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
    flowRate: {
      amountWei: parseEther(flowRate.amountEther),
      period: flowRate.period,
    },
    userData: paymentOption.userData ?? "0x",
  });

  return Object.freeze(commands);
};
