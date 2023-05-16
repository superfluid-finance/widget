import { createContext, useContext } from "react";
import { CheckoutConfig } from "./CheckoutConfig";
import {
  SupportedNetwork,
} from "superfluid-checkout-core";
import { PaymentOptionWithTokenInfo, SuperTokenInfo } from "./formValues";

export type CheckoutState = {
  superTokens: ReadonlyArray<SuperTokenInfo>;
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
