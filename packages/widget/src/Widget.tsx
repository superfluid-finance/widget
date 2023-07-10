import {
  Alert,
  AlertTitle,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import { SuperTokenInfo, TokenInfo } from "@superfluid-finance/tokenlist";
import memoize from "lodash.memoize";
import { useCallback, useMemo } from "react";
import { Address } from "viem";
import { CheckoutConfig, checoutConfigSchema } from "./CheckoutConfig";
import { WalletManager } from "./WalletManager";
import { WidgetContext, WidgetContextValue } from "./WidgetContext";
import { ViewProps, WidgetView } from "./WidgetView";
import { SupportedNetwork, supportedNetworks } from "./core";
import { PaymentOptionWithTokenInfo } from "./formValues";
import { addSuperTokenInfoToPaymentOptions } from "./helpers/addSuperTokenInfoToPaymentOptions";
import { filterSuperTokensFromTokenList } from "./helpers/filterSuperTokensFromTokenList";
import { mapSupportedNetworksFromPaymentOptions } from "./helpers/mapSupportedNetworksFromPaymentOptions";
import { buildThemeOptions } from "./theme";
import { EventListeners } from "./EventListeners";

export type WidgetProps = ViewProps &
  CheckoutConfig & {
    eventListeners?: EventListeners;
    walletManager: WalletManager;
    theme?: Omit<ThemeOptions, "unstable_strictMode" | "unstable_sxConfig">;
    stepper?: {
      orientation: "vertical" | "horizontal";
    };
  };

/**
 * The entrypoint to the Superfluid widget.
 */
export function Widget({
  productDetails,
  paymentDetails,
  tokenList,
  theme: theme_,
  walletManager,
  stepper: stepper_ = { orientation: "vertical" },
  eventListeners,
  ...viewProps
}: WidgetProps) {
  const { paymentOptions } = paymentDetails;

  const { superTokens, underlyingTokens } = useMemo(
    () => filterSuperTokensFromTokenList(tokenList),
    [tokenList]
  ); // TODO: Worry about consumer having to keep the token list reference unchanged.

  // TODO: Check if network is configured in wagmi.
  const networks: ReadonlyArray<SupportedNetwork> = useMemo(
    () => mapSupportedNetworksFromPaymentOptions(paymentOptions),
    [paymentOptions]
  );

  const paymentOptionWithTokenInfoList: ReadonlyArray<PaymentOptionWithTokenInfo> =
    useMemo(
      () => addSuperTokenInfoToPaymentOptions(superTokens, paymentOptions),
      [superTokens, paymentOptions]
    );

  const getSuperToken = useCallback<(address: Address) => SuperTokenInfo>(
    memoize((address: Address) => {
      const superToken = superTokens.find(
        (x) => x.address.toLowerCase() === address.toLowerCase()
      );
      if (!superToken) {
        throw new Error("Super Token not found from token list.");
      }
      return superToken;
    }),
    [superTokens]
  );

  const getUnderlyingToken = useCallback<(address: Address) => TokenInfo>(
    memoize((address: Address) => {
      const underlyingToken = underlyingTokens.find(
        (x) => x.address.toLowerCase() === address.toLowerCase()
      );
      if (!underlyingToken) {
        throw new Error("Super Token not found from token list.");
      }
      return underlyingToken;
    }),
    [underlyingTokens]
  );

  const getNetwork = useCallback<(chainId: number) => SupportedNetwork>(
    memoize((chainId: number) => {
      const network = supportedNetworks.find((x) => x.id === chainId);
      if (!network) {
        throw new Error("Network not found from supported networks.");
      }
      return network;
    }),
    []
  );

  const stepper = useMemo(
    () => ({
      orientation: stepper_.orientation,
    }),
    [stepper_.orientation]
  );

  const checkoutState = useMemo<WidgetContextValue>(
    () => ({
      getNetwork,
      getSuperToken,
      getUnderlyingToken,
      superTokens,
      productDetails,
      paymentDetails,
      tokenList,
      networks,
      paymentOptionWithTokenInfoList,
      walletManager,
      stepper,
      layout: {
        elevated: !["drawer", "dialog"].includes(viewProps.type),
      },
      eventListeners: {
        onSuccess: eventListeners?.onSuccess ?? NOOP_FUNCTION,
        onSuccessButtonClick:
          eventListeners?.onSuccessButtonClick ?? NOOP_FUNCTION,
      },
    }),
    [
      superTokens,
      productDetails,
      paymentDetails,
      tokenList,
      networks,
      walletManager,
      stepper,
      viewProps.type,
      eventListeners?.onSuccess,
      eventListeners?.onSuccessButtonClick,
    ]
  );

  const theme = useMemo(() => {
    const defaultThemeOptions = buildThemeOptions(
      theme_?.palette?.mode || "light"
    );
    const themeOptions = deepmerge(defaultThemeOptions, theme_);
    return createTheme(themeOptions);
  }, [theme_]);

  const validationResult = checoutConfigSchema.safeParse({
    productDetails,
    paymentDetails,
  });

  return (
    <WidgetContext.Provider value={checkoutState}>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> // TODO(KK): Probably don't want this in the widget. */}
        {/* TODO: (M) Add ScopedCssBaseline to handle scrollbar styles */}
        {validationResult.success ? (
          <WidgetView {...viewProps} />
        ) : (
          <Alert severity="error">
            <AlertTitle>Input Error</AlertTitle>
            {JSON.stringify(validationResult.error, null, 2)}
          </Alert>
        )}
      </ThemeProvider>
    </WidgetContext.Provider>
  );
}

const NOOP_FUNCTION = () => {};
