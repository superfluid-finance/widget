import { useMemo } from "react";
import { CheckoutConfig } from "./CheckoutConfig";
import { CheckoutContext, CheckoutState } from "./CheckoutContext";
import { CheckoutViewProps, ViewProvider } from "./ViewProvider";
import { SupportedNetwork, supportedNetworks } from "superfluid-checkout-core";
import { PaymentOptionWithTokenInfo, SuperTokenInfo } from "./formValues";
import { WalletAndWagmiProvider } from "./WalletAndWagmiProvider";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";

type Props = CheckoutViewProps &
  CheckoutConfig & {
    theme?: Omit<ThemeOptions, "unstable_strictMode" | "unstable_sxConfig">;
  };

export function CheckoutWidget({
  productDetails,
  paymentDetails,
  tokenList,
  theme: theme_,
  ...viewProps
}: Props) {
  const { paymentOptions } = paymentDetails;
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

  const networks = useMemo<ReadonlyArray<SupportedNetwork>>(() => {
    // TODO: In some cases, produces this error: Type 'Set<5 | 80001 | 420 | 421613 | 43113 | 100 | 137 | 10 | 42161 | 43114 | 56 | 1 | 42220>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
    // const uniqueChainIds = [...new Set(paymentOptions.map((x) => x.chainId))];
    const uniqueChainIds = paymentOptions
      .map((x) => x.chainId)
      .filter((chainId, index, self) => self.indexOf(chainId) === index);
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

  const checkoutState = useMemo<CheckoutState>(
    () => ({
      superTokens,
      productDetails,
      paymentDetails,
      tokenList,
      networks,
      paymentOptionWithTokenInfoList,
    }),
    [productDetails, paymentDetails, tokenList, networks]
  );

  const theme = useMemo(() => createTheme(theme_), [theme_]);

  return (
    <CheckoutContext.Provider value={checkoutState}>
      <WalletAndWagmiProvider>
        <ThemeProvider theme={theme}>
          <ViewProvider {...viewProps} />
        </ThemeProvider>
      </WalletAndWagmiProvider>
    </CheckoutContext.Provider>
  );
}
