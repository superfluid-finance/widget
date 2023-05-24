import { PaymentOption } from "superfluid-checkout-core";
import { PaymentOptionWithTokenInfo } from "../formValues";
import { SuperTokenInfo } from "@superfluid-finance/tokenlist";

export function addSuperTokenInfoToPaymentOptions(
  superTokens: ReadonlyArray<SuperTokenInfo>,
  paymentOptions: ReadonlyArray<PaymentOption>
): ReadonlyArray<PaymentOptionWithTokenInfo> {
  return paymentOptions
    .map((paymentOption) => {
      const superToken = superTokens.find(
        (tokenInfo_) =>
          tokenInfo_.address.toLowerCase() ===
          paymentOption.superToken.address.toLowerCase()
      );

      if (superToken === undefined) {
        // TODO: warn
        return null;
      }

      return {
        paymentOption,
        superToken,
      };
    })
    .filter((x): x is PaymentOptionWithTokenInfo => x !== null);
}
