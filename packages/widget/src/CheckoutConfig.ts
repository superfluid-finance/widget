import { SuperTokenList } from "@superfluid-finance/tokenlist";
import { z } from "zod";

import { paymentDetailsSchema, productDetailsSchema } from "./core/index.js";

export const checoutConfigSchema = z.object({
  productDetails: productDetailsSchema,
  paymentDetails: paymentDetailsSchema,
});

export type CheckoutConfig = z.infer<typeof checoutConfigSchema> & {
  readonly tokenList: SuperTokenList; // TODO: move to zod schema
};
