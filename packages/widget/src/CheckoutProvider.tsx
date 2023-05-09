import { useMemo } from "react";
import { CheckoutConfig } from "./CheckoutConfig";
import { CheckoutContext, SuperTokenInfo } from "./CheckoutContext";
import { CheckoutViewProps, ViewProvider } from "./ViewProvider";
import { SupportedNetwork, supportedNetworks } from "superfluid-checkout-core";
import { PaymentOptionWithTokenInfo } from "./formValues";

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

  const supportedNetworks_ = useMemo<ReadonlyArray<SupportedNetwork>>(() => {
    const uniqueChainIds = [...new Set(paymentOptions.map((x) => x.chainId))];
    return uniqueChainIds
      .map((chainId) => {
        const supportedNetwork = supportedNetworks.find(
          (network_) => network_.id === chainId
        );

        if (supportedNetwork === undefined) {
          // TODO: warn
          return null;
        }

        return supportedNetwork;
      })
      .filter((x): x is SupportedNetwork => x !== null);
  }, [paymentOptions]); 

  // Derive autocomplete options from the payment options.
  const paymentOptionWithTokenInfoList = useMemo<
    ReadonlyArray<PaymentOptionWithTokenInfo>
  >(
    () =>
      paymentOptions
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
        .filter((x): x is PaymentOptionWithTokenInfo => x !== null),
    [paymentOptions, superTokens]
  );

  const checkoutState = useMemo(
    () => ({
      superTokens,
      productDetails,
      paymentOptions,
      tokenList,
      supportedNetworks: supportedNetworks_,
      paymentOptionWithTokenInfoList,
    }),
    [productDetails, paymentOptions, tokenList, supportedNetworks_]
  );

  return (
    <CheckoutContext.Provider value={checkoutState}>
      <ViewProvider {...viewProps} />
    </CheckoutContext.Provider>
  );
}
