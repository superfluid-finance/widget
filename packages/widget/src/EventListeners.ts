import { Hash } from "viem";

import { cfAv1ForwarderABI, PaymentOption } from "./core";
import { MapABIFunctionNames } from "./utils";

export type TxFunctionName = MapABIFunctionNames<
  typeof cfAv1ForwarderABI,
  "nonpayable"
>[number];

/**
 * A set of non-blocking callback functions that are triggered in response to the widget events.
 * @example
 * <SuperfluidWidget eventListeners={{
 *   onButtonClick: (props) => console.log(`${props?.type} button is clicked`),
 *   onRouteChange: (props) => console.log(`Route is changed to ${props?.route}`),
 *   onSuccess: () => console.log('Checkout is successfully finished!'),
 *   onSuccessButtonClick: () => console.log('Merchant success button is clicked!')
 *   onPaymentOptionUpdate: (paymentOption) => setChainId(paymentOption?.chainId);
 * }} />
 */

export interface EventListeners {
  /** Called when a button is pressed. Usually a call to action (CTA). */
  onButtonClick?: (props?: {
    type:
      | "next_step"
      | "skip_step"
      | "step_label"
      | "connect_wallet"
      | "switch_network"
      | "invoke_transaction"
      | "back_transactions"
      | "success_button"
      | "superfluid_dashboard";
  }) => void;
  /** Called when the widget route changes. "Route" is a term to define the _view_ the user sees. */
  onRouteChange?: (props?: {
    route:
      | "step_payment_option"
      | "step_wrap"
      | "step_review"
      | "transactions"
      | "success_summary";
  }) => void;
  /** Called when a transaction is executed. */
  onTransactionExecuted?: (props?: {
    hash?: Hash;
    functionName?: TxFunctionName;
  }) => void;
  /** Called when the checkout is successfully finished.
   * @deprecated Use `onTransactionExecuted` instead (filter for `functionName === 'createFlow | 'updateFlow'`).
   */
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
export const runEventListener = <T>(
  func: (args?: T) => void,
  args?: T,
): void => {
  setTimeout(() => func(args), 0);
};
