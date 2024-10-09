import { nanoid } from "nanoid";
import {
  Address,
  formatUnits,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";

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
    const underlyingToken = {
      isNativeAsset: false,
      address: superToken.extensions.superTokenInfo.underlyingTokenAddress,
      decimals: underlyingTokenInfo!.decimals,
    } as const;

    const amountWeiFromUnderlyingTokenDecimals = parseUnits(
      wrapAmountInUnits,
      underlyingToken.decimals,
    );
    const amountWeiFromSuperTokenDecimals = parseEther(wrapAmountInUnits); // Super Tokens always have 18 decimals.

    if (amountWeiFromUnderlyingTokenDecimals !== 0n) {
      commands.push({
        id: nanoid(),
        type: "Wrap into Super Tokens",
        chainId: chainId,
        superTokenAddress,
        accountAddress,
        underlyingToken,
        amountInUnits: formatUnits(
          amountWeiFromUnderlyingTokenDecimals,
          underlyingToken.decimals,
        ) as `${number}`,
        amountWeiFromUnderlyingTokenDecimals,
        amountWeiFromSuperTokenDecimals,
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

  if (_isNativeAssetSuperToken) {
    const amountWeiFromSuperTokenDecimals = parseEther(wrapAmountInUnits); // Super Tokens always have 18 decimals.
    const amountWeiFromUnderlyingTokenDecimals = parseEther(wrapAmountInUnits); // We assume native assets also always have 18 decimals.

    commands.push({
      id: nanoid(),
      type: "Wrap into Super Tokens",
      chainId: chainId,
      superTokenAddress,
      accountAddress,
      underlyingToken: {
        isNativeAsset: true,
        address: zeroAddress,
        decimals: 18,
      },
      amountInUnits: wrapAmountInUnits,
      amountWeiFromUnderlyingTokenDecimals,
      amountWeiFromSuperTokenDecimals,
    });
  }

  commands.push({
    id: nanoid(),
    type: "Subscribe",
    chainId,
    superTokenAddress,
    accountAddress,
    receiverAddress: paymentOption.receiverAddress,
    transferAmountWei: parseEther(paymentOption.transferAmountEther ?? "0"),
    flowRate: {
      amountWei: parseEther(flowRate.amountEther),
      period: flowRate.period,
      modifyBehaviour: values.modifyFlowRateBehaviour,
    },
    userData: paymentOption.userData ?? "0x",
  });

  return Object.freeze(commands);
};
