import { Alert, AlertTitle, createTheme, ThemeProvider } from "@mui/material";
import { deepmerge } from "@mui/utils";
import defaultTokenList, {
  SuperTokenInfo,
  TokenInfo,
} from "@superfluid-finance/tokenlist";
import memoize from "lodash.memoize";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";
import { Address, zeroAddress } from "viem";
import { useConnect, useNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { fromZodError } from "zod-validation-error";

import {
  CheckoutConfig,
  checkoutConfigSchema,
  WidgetProps,
} from "./CheckoutConfig.js";
import { ChainId, SupportedNetwork, supportedNetworks } from "./core/index.js";
import { PaymentOptionWithTokenInfo } from "./formValues.js";
import { addSuperTokenInfoToPaymentOptions } from "./helpers/addSuperTokenInfoToPaymentOptions.js";
import { filterSuperTokensFromTokenList } from "./helpers/filterSuperTokensFromTokenList.js";
import { mapSupportedNetworksFromPaymentOptions } from "./helpers/mapSupportedNetworksFromPaymentOptions.js";
import { buildThemeOptions } from "./theme.js";
import { WidgetContext, WidgetContextValue } from "./WidgetContext.js";
import { ViewProps, WidgetView } from "./WidgetView.js";

/**
 * The entrypoint to the Superfluid widget.
 */
export function Widget({
  productDetails: productDetails_ = {
    name: "",
  },
  paymentDetails: paymentDetails_,
  tokenList = defaultTokenList,
  theme: theme_,
  walletManager: walletManager_,
  stepper: stepper_ = { orientation: "vertical" },
  eventListeners,
  type = "page",
  ..._viewProps
}: WidgetProps & Partial<ViewProps>) {
  const viewProps: ViewProps =
    type === "page" ? { type } : ({ type, ..._viewProps } as ViewProps);

  const { connect, connectors } = useConnect();
  const { chains } = useNetwork();
  const walletManager = useMemo(() => {
    if (walletManager_) {
      return walletManager_;
    }

    // Note that there's no good reason to use the default wallet manager in production. It is only to make setting up the widget easier for the _first time_.
    const defaultWalletManager = {
      isOpen: false,
      open: () =>
        connect({
          connector:
            connectors.find((x) => x.id === "injected") ??
            new InjectedConnector({
              chains,
              options: { shimDisconnect: true },
            }),
        }),
    };

    return defaultWalletManager;
  }, [walletManager_, connectors, connect, chains]);

  const paymentDetailsInputStringified = JSON.stringify(paymentDetails_);
  const productDetailsInputStringified = JSON.stringify(productDetails_);

  const validationResult = useMemo(
    () =>
      checkoutConfigSchema.safeParse({
        productDetails: productDetails_,
        paymentDetails: paymentDetails_,
      }),
    [productDetailsInputStringified, paymentDetailsInputStringified],
  );

  const {
    productDetails,
    paymentDetails,
  }: {
    productDetails: CheckoutConfig["productDetails"];
    paymentDetails: CheckoutConfig["paymentDetails"];
  } = useMemo(() => {
    if (validationResult.success) {
      return {
        productDetails: validationResult.data.productDetails,
        paymentDetails: validationResult.data.paymentDetails,
      };
    } else {
      return {
        productDetails: {
          name: "",
        },
        paymentDetails: {
          paymentOptions: [],
        },
      };
    }
  }, [validationResult]);

  const { superTokens, underlyingTokens } = useMemo(
    () => filterSuperTokensFromTokenList(tokenList),
    [tokenList],
  ); // TODO: Worry about consumer having to keep the token list reference unchanged.

  // TODO: Check if network is configured in wagmi.
  const networks: ReadonlyArray<SupportedNetwork> = useMemo(
    () => mapSupportedNetworksFromPaymentOptions(paymentDetails.paymentOptions),
    [validationResult],
  );

  const getSuperToken = useCallback<(address: Address) => SuperTokenInfo>(
    memoize((address: Address) => {
      const superToken = superTokens.find(
        (x) => x.address.toLowerCase() === address.toLowerCase(),
      );
      if (!superToken) {
        throw new Error(
          `Super Token [${address}] not found from token list (which contains ${superTokens.length} Super Tokens).`,
        );
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
        throw new Error(
          `Underlying token [${address}] not found from token list (which contains ${underlyingTokens.length} underlying tokens).`,
        );
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
          paymentDetails.paymentOptions,
          getSuperToken,
          getUnderlyingToken,
          getNativeAsset,
        ),
      [
        paymentDetails.paymentOptions,
        getSuperToken,
        getUnderlyingToken,
        getNativeAsset,
      ],
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
      type: viewProps.type,
      eventListeners: {
        onSuccess: eventListeners?.onSuccess ?? NOOP_FUNCTION,
        onSuccessButtonClick:
          eventListeners?.onSuccessButtonClick ?? NOOP_FUNCTION,
        onPaymentOptionUpdate:
          eventListeners?.onPaymentOptionUpdate ?? NOOP_FUNCTION,
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

  // TODO(KK): debug message about what token list is used?

  const paymentDetailsKey = useMemo(
    () => nanoid(),
    [paymentDetailsInputStringified],
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
