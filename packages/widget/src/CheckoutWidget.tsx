import { useEffect, useMemo, useState } from "react";
import { CheckoutConfig } from "./CheckoutConfig";
import { CheckoutContext, CheckoutState } from "./CheckoutContext";
import { CheckoutViewProps, ViewProvider } from "./ViewProvider";
import { SupportedNetwork } from "superfluid-checkout-core";
import { PaymentOptionWithTokenInfo, SuperTokenInfo } from "./formValues";
import { WalletAndWagmiProvider } from "./WalletAndWagmiProvider";
import {
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { getSupportedNetworksFromPaymentOptions } from "./helpers/getSupportedNetworksFromPaymentOptions";
import { addSuperTokenInfoToPaymentOptions } from "./helpers/addSuperTokenInfoToPaymentOptions";
import { getSuperTokensFromTokenList } from "./helpers/getSuperTokensFromTokenList";

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

  const superTokens: ReadonlyArray<SuperTokenInfo> = useMemo(
    () => getSuperTokensFromTokenList(tokenList),
    [tokenList]
  ); // TODO: Worry about consumer having to keep the token list reference unchanged.

  const networks: ReadonlyArray<SupportedNetwork> = useMemo(
    () => getSupportedNetworksFromPaymentOptions(paymentOptions),
    [paymentOptions]
  );

  const paymentOptionWithTokenInfoList: ReadonlyArray<PaymentOptionWithTokenInfo> =
    useMemo(
      () => addSuperTokenInfoToPaymentOptions(superTokens, paymentOptions),
      [superTokens, paymentOptions]
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
    [superTokens, productDetails, paymentDetails, tokenList, networks]
  );

  const theme = useMemo(() => createTheme(theme_), [theme_]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => void setMounted(true), []);

  if (!mounted) {
    return null; // TODO: SEO.
  }

  return (
    <CheckoutContext.Provider value={checkoutState}>
      <WalletAndWagmiProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ViewProvider {...viewProps} />
        </ThemeProvider>
      </WalletAndWagmiProvider>
    </CheckoutContext.Provider>
  );
}
