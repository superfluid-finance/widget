import { createContext, useContext } from "react";
import { CheckoutConfig } from "./CheckoutConfig";

type ModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export type CheckoutContextValue = {
  modal: ModalState;
} & CheckoutConfig;

export const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined);

export function useCheckout(): CheckoutContextValue {
  const checkoutContext = useContext(CheckoutContext);

  if (!checkoutContext) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }

  return checkoutContext;
}