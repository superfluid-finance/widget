import { createContext, useContext } from "react";
import { CheckoutConfig } from "./CheckoutConfig.js";
import { ChainId, SupportedNetwork } from "./core/index.js";
import { PaymentOptionWithTokenInfo } from "./formValues.js";
import { Address } from "viem";
import { WalletManager } from "./WalletManager.js";
import { SuperTokenInfo, TokenInfo } from "@superfluid-finance/tokenlist";
import { Orientation } from "@mui/material";
import { EventListeners } from "./EventListeners.js";
import { ViewProps } from "./WidgetView.js";

export type WidgetContextValue = {
  getSuperToken: (address: Address) => SuperTokenInfo;
  getUnderlyingToken: (address: Address) => TokenInfo;
  getNetwork: (chainId: ChainId) => SupportedNetwork;
  getNativeAsset: (chainId: ChainId) => TokenInfo;
  superTokens: ReadonlyArray<SuperTokenInfo>;
  networks: ReadonlyArray<SupportedNetwork>;
  paymentOptionWithTokenInfoList: ReadonlyArray<PaymentOptionWithTokenInfo>;
  walletManager: WalletManager;
  imageURI?: string;
  stepper: {
    orientation: Orientation;
  };
  layout: {
    elevated: boolean;
  };
  type: ViewProps["type"];
  eventListeners: Required<EventListeners>;
} & CheckoutConfig;

export const WidgetContext = createContext<WidgetContextValue | undefined>(
  undefined,
);

export function useWidget(): WidgetContextValue {
  const context = useContext(WidgetContext);

  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }

  return context;
}
