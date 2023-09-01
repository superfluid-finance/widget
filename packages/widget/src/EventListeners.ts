import { PaymentOption } from "./core";

/**
 * A set of non-blocking callback functions that are triggered in response to the widget events.
 * @example
 * <SuperfluidWidget eventListeners={{
 *   onContinue: (step) => console.log(`Continue button is clicked on step! ${step}`),
 *   onSuccess: () => console.log('Checkout is successfully finished!'),
 *   onSuccessButtonClick: () => console.log('Merchant success button is clicked!')
 *   onPaymentOptionUpdate: (paymentOption) => setChainId(paymentOption?.chainId);
 * }} />
 */
export interface EventListeners {
  /** Called when a button is pressed */
  onButtonClick?: (props?: {
    type:
      | "continue"
      | "back"
      | "connect_wallet"
      | "skip"
      | "stepper"
      | "transaction"
      | "open_dashboard";
  }) => void;
  onRouteChange?: (props?: {
    route: "payment_option" | "wrap" | "transactions" | "review" | "summary";
  }) => void;
  /** Called when the checkout is successfully finished. */
  onSuccess?: () => void;
  /** Called when the merchant's success button is defined in the schema and it's clicked. */
  onSuccessButtonClick?: () => void;
  /**
   * Called when the payment option is initialized or changed by the user.
   */
  onPaymentOptionUpdate?: (paymentOption?: PaymentOption) => void;
}

/**
 * Run the event callback in non-blocking manner.
 */
export const runEventListener = <T>(func: (args?: T) => any, args?: T) =>
  setTimeout(() => func(args), 0);
