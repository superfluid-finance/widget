import { PersonalData } from "./index.js";
import { Errors } from "./utils.js";

/**
 * A set of block callback functions that are called at the appropriate time.
 * @example
 * <SuperfluidWidget callbacks={{
 *   validatePersonalData: async (props) => { fetch('https://example.com', { method: 'POST', body: props?.data }) }},
 * }} />
 */

export interface Callbacks {
  /** Called when the user clicks the "Continue" button on the "Personal Data" step. */
  validatePersonalData: (
    data: PersonalData,
  ) => Errors | void | Promise<Errors | void>;
}
