import { createContext, useContext } from "react";
import { CheckoutConfig } from "./CheckoutConfig";
import { TokenInfo } from "@uniswap/token-lists";
import {
  SuperTokenExtension,
  SupportedNetwork,
} from "superfluid-checkout-core";
import { PaymentOptionWithTokenInfo } from "./formValues";

export type SuperTokenInfo = TokenInfo & {
  extensions: {
    superTokenInfo: SuperTokenExtension;
  };
};

export type CheckoutState = {
  superTokens: SuperTokenInfo[];
  networks: ReadonlyArray<SupportedNetwork>;
  paymentOptionWithTokenInfoList: ReadonlyArray<PaymentOptionWithTokenInfo>;
} & CheckoutConfig;

export const CheckoutContext = createContext<CheckoutState | undefined>(
  undefined
);

export function useCheckout(): CheckoutState {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }

  return context;
}
