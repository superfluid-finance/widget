import { SuperTokenInfo, TokenInfo } from "@superfluid-finance/tokenlist";
import { Address } from "viem";

import { ChainId, PaymentOption } from "../core/index.js";
import { PaymentOptionWithTokenInfo } from "../formValues.js";

export function addSuperTokenInfoToPaymentOptions(
  paymentOptions: ReadonlyArray<PaymentOption>,
  getSuperToken: (address: Address) => SuperTokenInfo,
  getUnderlyingToken: (address: Address) => TokenInfo,
  getNativeAsset: (chainId: ChainId) => TokenInfo,
): ReadonlyArray<PaymentOptionWithTokenInfo> {
  return paymentOptions
    .map((paymentOption) => {
      const superToken = getSuperToken(paymentOption.superToken.address);
      const underlyingToken =
        superToken.extensions.superTokenInfo.type === "Wrapper"
          ? getUnderlyingToken(
              superToken.extensions.superTokenInfo.underlyingTokenAddress,
            )
          : superToken.extensions.superTokenInfo.type === "Native Asset"
          ? getNativeAsset(paymentOption.chainId)
          : null;

      return {
        paymentOption,
        superToken,
        underlyingToken,
      };
    })
    .filter((x): x is PaymentOptionWithTokenInfo => x !== null);
}
