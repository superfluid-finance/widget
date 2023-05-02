import { useMemo } from "react";
import { CheckoutConfig } from "./CheckoutConfig";
import { CheckoutContext, SuperTokenInfo } from "./CheckoutContext";
import { CheckoutViewProps, ViewProvider } from "./ViewProvider";

type Props = CheckoutViewProps & CheckoutConfig;

export function CheckoutProvider({
  productDetails,
  paymentOptions,
  tokenList,
  ...viewProps
}: Props) {
  // TODO: validate input

  // # Handle tokens
  const superTokens = useMemo<SuperTokenInfo[]>(
    () =>
      tokenList.tokens.filter(
        (x): x is SuperTokenInfo => !!x.extensions?.superTokenInfo
      ),
    [tokenList]
  ); // TODO: Worry about consumer having to keep the token list reference unchanged.
  // ---

  const checkoutState = useMemo(
    () => ({
      superTokens,
      productDetails,
      paymentOptions,
      tokenList,
    }),
    [productDetails, paymentOptions, tokenList]
  );

  return (
    <CheckoutContext.Provider value={checkoutState}>
      <ViewProvider {...viewProps} />
    </CheckoutContext.Provider>
  );
}
