/**
 * A set of non-blocking callback functions that are triggered in response to the widget events.
 */
export interface EventListeners {
  /** Called when the checkout is successfully finished. */
  onSuccess?: () => void;
  /** Called when the merchant's success button is defined in the schema and it's clicked. */
  onSuccessButtonClick?: () => void;
}

/**
 * Run the event callback in non-blocking manner.
 */
export const runEventListener = (func: () => void) => setTimeout(func, 0);
