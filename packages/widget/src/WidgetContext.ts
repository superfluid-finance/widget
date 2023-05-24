import { createContext, useContext } from "react";
import { CheckoutConfig } from "./CheckoutConfig";
import { ChainId, SupportedNetwork } from "superfluid-checkout-core";
import { PaymentOptionWithTokenInfo } from "./formValues";
import { Address } from "viem";
import { WalletManager } from "./WalletManager";
import { TokenInfo } from "@uniswap/token-lists";
import { SuperTokenInfo } from "@superfluid-finance/tokenlist";

export type WidgetContextValue = {
  getSuperToken: (address: Address) => SuperTokenInfo;
  getUnderlyingToken: (address: Address) => TokenInfo;
  getNetwork: (chainId: ChainId) => SupportedNetwork;
  superTokens: ReadonlyArray<SuperTokenInfo>;
  networks: ReadonlyArray<SupportedNetwork>;
  paymentOptionWithTokenInfoList: ReadonlyArray<PaymentOptionWithTokenInfo>;
  walletManager: WalletManager;
  imageURI?: string;
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
