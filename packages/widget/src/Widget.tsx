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
import { Address, zeroAddress } from "viem";
import { CheckoutConfig, checoutConfigSchema } from "./CheckoutConfig";
import { WalletManager } from "./WalletManager";
import { WidgetContext, WidgetContextValue } from "./WidgetContext";
import { ViewProps, WidgetView } from "./WidgetView";
import { ChainId, SupportedNetwork, supportedNetworks } from "./core";
import { PaymentOptionWithTokenInfo } from "./formValues";
import { addSuperTokenInfoToPaymentOptions } from "./helpers/addSuperTokenInfoToPaymentOptions";
import { filterSuperTokensFromTokenList } from "./helpers/filterSuperTokensFromTokenList";
import { mapSupportedNetworksFromPaymentOptions } from "./helpers/mapSupportedNetworksFromPaymentOptions";
import { buildThemeOptions } from "./theme";
import { EventListeners } from "./EventListeners";
import { nanoid } from "nanoid";
import { fromZodError } from "zod-validation-error";

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
    [tokenList],
  ); // TODO: Worry about consumer having to keep the token list reference unchanged.

  // TODO: Check if network is configured in wagmi.
  const networks: ReadonlyArray<SupportedNetwork> = useMemo(
    () => mapSupportedNetworksFromPaymentOptions(paymentOptions),
    [paymentOptions],
  );

  const getSuperToken = useCallback<(address: Address) => SuperTokenInfo>(
    memoize((address: Address) => {
      const superToken = superTokens.find(
        (x) => x.address.toLowerCase() === address.toLowerCase(),
      );
      if (!superToken) {
        throw new Error("Super Token not found from token list.");
      }
      return superToken;
    }),
    [superTokens],
  );

  const getUnderlyingToken = useCallback<(address: Address) => TokenInfo>(
    memoize((address: Address) => {
      const underlyingToken = underlyingTokens.find(
        (x) => x.address.toLowerCase() === address.toLowerCase(),
      );
      if (!underlyingToken) {
        throw new Error("Super Token not found from token list.");
      }
      return underlyingToken;
    }),
    [underlyingTokens],
  );

  const getNetwork = useCallback<(chainId: number) => SupportedNetwork>(
    memoize((chainId: number) => {
      const network = supportedNetworks.find((x) => x.id === chainId);
      if (!network) {
        throw new Error("Network not found from supported networks.");
      }
      return network;
    }),
    [],
  );

  const getNativeAsset = useCallback<(chainId: ChainId) => TokenInfo>(
    memoize((chainId: ChainId) => {
      const nativeAsset = getNetwork(chainId).nativeCurrency;
      return {
        chainId: chainId,
        address: zeroAddress,
        name: nativeAsset.name,
        decimals: nativeAsset.decimals,
        symbol: nativeAsset.symbol,
      };
    }),
    [getNetwork],
  );

  const paymentOptionWithTokenInfoList: ReadonlyArray<PaymentOptionWithTokenInfo> =
    useMemo(
      () =>
        addSuperTokenInfoToPaymentOptions(
          paymentOptions,
          getSuperToken,
          getUnderlyingToken,
          getNativeAsset,
        ),
      [paymentOptions, getSuperToken, getUnderlyingToken, getNativeAsset],
    );

  const stepper = useMemo(
    () => ({
      orientation: stepper_.orientation,
    }),
    [stepper_.orientation],
  );

  const checkoutState = useMemo<WidgetContextValue>(
    () => ({
      getNetwork,
      getSuperToken,
      getUnderlyingToken,
      getNativeAsset,
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
      getNativeAsset,
      getSuperToken,
      getNetwork,
      getNativeAsset,
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
    ],
  );

  const theme = useMemo(() => {
    const defaultThemeOptions = buildThemeOptions(
      theme_?.palette?.mode || "light",
    );
    const themeOptions = deepmerge(defaultThemeOptions, theme_);
    return createTheme(themeOptions);
  }, [theme_]);

  const validationResult = checoutConfigSchema.safeParse({
    productDetails,
    paymentDetails,
  });

  const paymentDetailsKey = useMemo(
    () => nanoid(),
    [JSON.stringify(paymentDetails)],
  );

  return (
    <WidgetContext.Provider value={checkoutState}>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> // TODO(KK): Probably don't want this in the widget. */}
        {/* TODO: (M) Add ScopedCssBaseline to handle scrollbar styles */}
        {validationResult.success ? (
          <WidgetView key={paymentDetailsKey} {...viewProps} />
        ) : (
          <Alert data-testid="widget-error" severity="error">
            <AlertTitle>Input Error</AlertTitle>
            {fromZodError(validationResult.error).message}
          </Alert>
        )}
      </ThemeProvider>
    </WidgetContext.Provider>
  );
}

const NOOP_FUNCTION = () => {};
