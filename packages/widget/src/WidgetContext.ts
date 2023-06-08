import { createContext, useContext } from "react";
import { CheckoutConfig } from "./CheckoutConfig";
import { ChainId, SupportedNetwork } from "./core";
import { PaymentOptionWithTokenInfo } from "./formValues";
import { Address } from "viem";
import { WalletManager } from "./WalletManager";
import { SuperTokenInfo, TokenInfo } from "@superfluid-finance/tokenlist";
import { Orientation } from "@mui/material";

export type WidgetContextValue = {
  getSuperToken: (address: Address) => SuperTokenInfo;
  getUnderlyingToken: (address: Address) => TokenInfo;
  getNetwork: (chainId: ChainId) => SupportedNetwork;
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
} & CheckoutConfig;

export const WidgetContext = createContext<WidgetContextValue | undefined>(
  undefined
);

export function useWidget(): WidgetContextValue {
  const context = useContext(WidgetContext);

  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }

  return context;
}
