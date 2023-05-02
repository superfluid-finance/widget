import { createContext, useContext } from "react";
import { CheckoutConfig } from "./CheckoutConfig";
import { TokenInfo } from "@uniswap/token-lists";
import { SuperTokenExtension } from "superfluid-checkout-core";

export type SuperTokenInfo = TokenInfo & {
  extensions: {
    superTokenInfo: SuperTokenExtension;
  };
};

export type CheckoutState = {
  superTokens: SuperTokenInfo[];
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
