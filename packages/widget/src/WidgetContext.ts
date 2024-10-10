import { Orientation } from "@mui/material";
import { SuperTokenInfo, TokenInfo } from "@superfluid-finance/tokenlist";
import { createContext, useContext } from "react";
import { Address } from "viem";

import { Callbacks } from "./Callbacks.js";
import { CheckoutConfig } from "./CheckoutConfig.js";
import { ChainId, ExistentialNFT, SupportedNetwork } from "./core/index.js";
import { PersonalData } from "./core/PersonalData.js";
import { EventHandlers } from "./EventListeners.js";
import { PaymentOptionWithTokenInfo } from "./formValues.js";
import { WalletManager } from "./WalletManager.js";
import { ViewProps } from "./WidgetView.js";

export type WidgetContextValue = {
  getSuperToken: (chainId: number, address: Address) => SuperTokenInfo;
  getUnderlyingToken: (chainId: number, address: Address) => TokenInfo;
  getNetwork: (chainId: ChainId) => SupportedNetwork;
  getNativeAsset: (chainId: ChainId) => TokenInfo;
  superTokens: ReadonlyArray<SuperTokenInfo>;
  networks: ReadonlyArray<SupportedNetwork>;
  paymentOptionWithTokenInfoList: ReadonlyArray<PaymentOptionWithTokenInfo>;
  walletManager: WalletManager;
  existentialNFT?: ExistentialNFT;
  imageURI?: string;
  personalData: PersonalData;
  stepper: {
    orientation: Orientation;
  };
  layout: {
    elevated: boolean;
  };
  type: ViewProps["type"];
  eventHandlers: EventHandlers;
  callbacks: Required<Pick<Callbacks, "validatePersonalData">>;
} & Required<CheckoutConfig>;

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
