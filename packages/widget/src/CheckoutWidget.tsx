import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckoutConfig, checoutConfigSchema } from "./CheckoutConfig";
import { CheckoutContext, CheckoutState } from "./CheckoutContext";
import { CheckoutViewProps, ViewProvider } from "./ViewProvider";
import { SupportedNetwork } from "superfluid-checkout-core";
import {
  PaymentOptionWithTokenInfo,
  SuperTokenInfo,
} from "./formValues";
import {
  Alert,
  AlertTitle,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { getSupportedNetworksFromPaymentOptions } from "./helpers/getSupportedNetworksFromPaymentOptions";
import { addSuperTokenInfoToPaymentOptions } from "./helpers/addSuperTokenInfoToPaymentOptions";
import { getSuperTokensFromTokenList } from "./helpers/getSuperTokensFromTokenList";
import { Address } from "viem";
import { WalletManager } from "./WalletManager";

export type CheckoutWidgetProps = CheckoutViewProps &
  CheckoutConfig & {
    walletManager: WalletManager,
    theme?: Omit<ThemeOptions, "unstable_strictMode" | "unstable_sxConfig">;
  };

export function CheckoutWidget({
  productDetails,
  paymentDetails,
  tokenList,
  theme: theme_,
  walletManager,
  ...viewProps
}: CheckoutWidgetProps) {
  const { paymentOptions } = paymentDetails;

  const superTokens: ReadonlyArray<SuperTokenInfo> = useMemo(
    () => getSuperTokensFromTokenList(tokenList),
    [tokenList]
  ); // TODO: Worry about consumer having to keep the token list reference unchanged.

  // TODO: Check if network is configured in wagmi.
  const networks: ReadonlyArray<SupportedNetwork> = useMemo(
    () => getSupportedNetworksFromPaymentOptions(paymentOptions),
    [paymentOptions]
  );

  const paymentOptionWithTokenInfoList: ReadonlyArray<PaymentOptionWithTokenInfo> =
    useMemo(
      () => addSuperTokenInfoToPaymentOptions(superTokens, paymentOptions),
      [superTokens, paymentOptions]
    );

  const getSuperToken = useCallback<(address: Address) => SuperTokenInfo>((address: Address) => {
    const superToken = superTokens.find(x => x.address.toLowerCase() === address.toLowerCase());
    if (!superToken) {
      throw new Error("Super Token not found from token list.");
    }
    return superToken;
  }, [superTokens]); // TODO(KK): memoize

  const checkoutState = useMemo<CheckoutState>(
    () => ({
      getSuperToken,
      superTokens,
      productDetails,
      paymentDetails,
      tokenList,
      networks,
      paymentOptionWithTokenInfoList,
      walletManager
    }),
    [superTokens, productDetails, paymentDetails, tokenList, networks, walletManager]
  );

  const theme = useMemo(() => createTheme(theme_), [theme_]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => void setMounted(true), []);

  if (!mounted) {
    return null; // TODO: SEO.
  }

  const validationResult = checoutConfigSchema.safeParse({
    productDetails,
    paymentDetails,
  });

  return (
    <CheckoutContext.Provider value={checkoutState}>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> // TODO(KK): Probably don't want this in the widget. */}
          {validationResult.success ? (
            <ViewProvider {...viewProps} />
          ) : (
            <Alert severity="error">
              <AlertTitle>Input Error</AlertTitle>
              {JSON.stringify(validationResult.error, null, 2)}
            </Alert>
          )}
        </ThemeProvider>
    </CheckoutContext.Provider>
  );
}
