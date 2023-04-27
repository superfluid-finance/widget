import { createContext, useContext } from "react";
import { CheckoutConfig } from "./CheckoutConfig";
import { TokenInfo } from "@uniswap/token-lists";
import { SuperTokenExtension } from "superfluid-checkout-core";

type ModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export type SuperTokenInfo = TokenInfo & {
  extensions: {
    superTokenInfo: SuperTokenExtension;
  };
};

export type CheckoutContextValue = {
  modal: ModalState;
  superTokens: SuperTokenInfo[];
} & CheckoutConfig;

export const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined
);

export function useCheckout(): CheckoutContextValue {
  const checkoutContext = useContext(CheckoutContext);

  if (!checkoutContext) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }

  return checkoutContext;
}
