"use client";

import { Alert, AlertTitle, ThemeProvider, Typography } from "@mui/material";
import { SuperTokenInfo, TokenInfo } from "@superfluid-finance/tokenlist";
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
import { EventHandlers, runEventHandlers } from "./EventListeners.js";
import { PaymentOptionWithTokenInfo } from "./formValues.js";
import { addSuperTokenInfoToPaymentOptions } from "./helpers/addSuperTokenInfoToPaymentOptions.js";
import { filterSuperTokensFromTokenList } from "./helpers/filterSuperTokensFromTokenList.js";
import { mapSupportedNetworksFromPaymentOptions } from "./helpers/mapSupportedNetworksFromPaymentOptions.js";
import { createWidgetTheme } from "./theme.js";
import { WidgetContext, WidgetContextValue } from "./WidgetContext.js";
import { ViewProps, WidgetView } from "./WidgetView.js";

type Props = WidgetProps &
  Required<Pick<WidgetProps, "tokenList" | "stepper" | "personalData">> &
  Partial<ViewProps>;

export function WidgetCore({
  productDetails: productDetails_,
  paymentDetails: paymentDetails_,
  theme: theme_,
  tokenList,
  existentialNFT,
  walletManager: walletManager_,
  stepper: stepper_,
  eventListeners,
  callbacks,
  type,
  networkAssets,
  personalData,
  ..._viewProps
}: Props) {
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
      // TODO(KK): This should run through the validation as well to automatically populate with default values.
      return {
        productDetails: {
          name: "",
        },
        paymentDetails: {
          modifyFlowRateBehaviour: "ADD",
          paymentOptions: [],
          defaultWrapAmount: {
            multiplier: 3,
            period: "month",
          },
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

  const getSuperToken = useCallback<
    (chainId: number, address: Address) => SuperTokenInfo
  >(
    memoize(
      (chainId: number, address: Address) => {
        const superToken = superTokens.find(
          (x) =>
            x.chainId === chainId &&
            x.address.toLowerCase() === address.toLowerCase(),
        );
        if (!superToken) {
          throw new Error(
            `Super Token [${address}] on chain [${chainId}] not found from token list (which contains ${superTokens.length} Super Tokens).`,
          );
        }
        return superToken;
      },
      (chainId, address) => `${chainId}-${address.toLowerCase()}`,
    ),
    [superTokens],
  );

  const getUnderlyingToken = useCallback<
    (chainId: number, address: Address) => TokenInfo
  >(
    memoize(
      (chainId: number, address: Address) => {
        const underlyingToken = underlyingTokens.find(
          (x) =>
            x.chainId === chainId &&
            x.address.toLowerCase() === address.toLowerCase(),
        );
        if (!underlyingToken) {
          throw new Error(
            `Underlying token [${address}] on chain [${chainId}] not found from token list (which contains ${underlyingTokens.length} underlying tokens).`,
          );
        }
        return underlyingToken;
      },
      (chainId, address) => `${chainId}-${address.toLowerCase()}`,
    ),
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
      const nativeAssetSuperToken = superTokens.find(
        (x) =>
          x.chainId === chainId &&
          x.extensions.superTokenInfo.type === "Native Asset",
      );
      return {
        chainId: chainId,
        address: zeroAddress,
        name: nativeAsset.name,
        decimals: nativeAsset.decimals,
        symbol: nativeAsset.symbol,
        logoURI: nativeAssetSuperToken?.logoURI,
      } as TokenInfo;
    }),
    [getNetwork, superTokens],
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

  const eventHandlers = useMemo<EventHandlers>(
    () => ({
      onButtonClick: runEventHandlers(
        eventListeners?.onButtonClick,
        callbacks?.onButtonClick,
      ),
      onRouteChange: runEventHandlers(
        eventListeners?.onRouteChange,
        callbacks?.onRouteChange,
      ),
      onTransactionSent: runEventHandlers(
        eventListeners?.onTransactionSent,
        callbacks?.onTransactionSent,
      ),
      onSuccess: runEventHandlers(
        eventListeners?.onSuccess,
        callbacks?.onSuccess,
      ),
      onSuccessButtonClick: runEventHandlers(
        eventListeners?.onSuccessButtonClick,
        callbacks?.onSuccessButtonClick,
      ),
      onPaymentOptionUpdate: runEventHandlers(
        eventListeners?.onPaymentOptionUpdate,
        callbacks?.onPaymentOptionUpdate,
      ),
      onPersonalDataUpdate: runEventHandlers(
        eventListeners?.onPersonalDataUpdate,
        callbacks?.onPersonalDataUpdate,
      ),
    }),
    [eventListeners, callbacks],
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
      personalData,
      tokenList,
      existentialNFT,
      networks,
      paymentOptionWithTokenInfoList,
      walletManager,
      stepper,
      layout: {
        elevated: !["drawer", "dialog"].includes(viewProps.type),
      },
      type: viewProps.type,
      eventHandlers,
      callbacks: {
        validatePersonalData: callbacks?.validatePersonalData ?? NOOP_FUNCTION,
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
      personalData,
      existentialNFT,
      tokenList,
      networks,
      walletManager,
      stepper,
      viewProps.type,
      personalData,
      eventHandlers,
      callbacks,
    ],
  );

  const theme = useMemo(() => createWidgetTheme(theme_), [theme_]);

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
          <WidgetView
            key={`${viewProps.type}-${paymentDetailsKey}`}
            {...viewProps}
          />
        ) : (
          <Alert data-testid="widget-error" severity="error">
            <AlertTitle>Input Error</AlertTitle>
            <Typography variant="inherit" whiteSpace="pre-wrap">
              {
                fromZodError(validationResult.error, {
                  issueSeparator: "\n",
                }).message
              }
            </Typography>
          </Alert>
        )}
      </ThemeProvider>
    </WidgetContext.Provider>
  );
}

export function NOOP_FUNCTION() {}
