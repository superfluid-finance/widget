import { EventListeners, PersonalData } from "./index.js";
import { Errors } from "./utils.js";

/**
 * A set of blocking callback functions that are called at the appropriate time.
 * @example
 * <SuperfluidWidget callbacks={{
 *   validatePersonalData: async (props) => { fetch('https://example.com', { method: 'POST', body: props?.data }) }},
 * }} />
 */

export interface Callbacks extends EventListeners {
  /** Called when the user clicks the "Continue" button in the personal data step. */
  validatePersonalData?: (
    data: PersonalData,
  ) => Errors | void | Promise<Errors | void>;
}
