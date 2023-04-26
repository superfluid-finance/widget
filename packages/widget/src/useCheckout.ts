import { useContext } from "react";
import { CheckoutContext, CheckoutContextValue } from "./CheckoutProvider";

function useCheckout(): CheckoutContextValue {
  const checkoutContext = useContext(CheckoutContext);

  if (!checkoutContext) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }

  return checkoutContext;
}

export default useCheckout;
