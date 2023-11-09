import { ExtractAbiFunctionNames } from "abitype";
import { Hash } from "viem";

import { cfAv1ForwarderABI, PaymentOption } from "./core/index.js";

export type TxFunctionName = ExtractAbiFunctionNames<
  typeof cfAv1ForwarderABI,
  "nonpayable" | "payable"
>;

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
      | "superfluid_dashboard"
      | "retry_gas_estimation"
      | "force_invoke_transaction"
      | "skip_to_next"
      | "copy_account_address"
      | "view_transaction_on_block_explorer";
  }) => void;
  /** Called when the widget route changes. "Route" is a term to define the _view_ the user sees. */
  onRouteChange?: (props?: {
    route:
      | "step_payment_option"
      | "step_wrap"
      | "step_review"
      | "step_personal_data"
      | "transactions"
      | "success_summary";
    data?: Record<string, string>;
  }) => void;
  /** Called when any personalData fields update. */
  onPersonalDataUpdate?: (props?: { data?: Record<string, string> }) => void;
  /** Called when a transaction is executed. */
  onTransactionSent?: (props?: {
    hash?: Hash;
    functionName?: TxFunctionName;
  }) => void;
  /** Called when the checkout is successfully finished.
   * @deprecated Use `onTransactionSent` instead (filter for `functionName === 'createFlow | 'updateFlow'`).
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
 * Combines both non-blocking event listeners and blocking event callbacks.
 */
export interface EventHandlers extends Required<EventListeners> {}

/**
 * Runs both the non-blocking event listener and the blocking callback.
 */
export const runEventHandlers = <T, R = void>(
  listener?: (args?: T) => R,
  callback?: (args?: T) => R,
) => {
  return (arg?: T) => {
    if (listener) {
      runEventListener(listener, arg);
    }

    if (callback) {
      callback(arg);
    }
  };
};

/**
 * Run the event callback in non-blocking manner.
 */
const runEventListener = <T, R = void>(
  func: (args?: T) => R,
  arg?: T,
): void => {
  setTimeout(() => func(arg), 0);
};
