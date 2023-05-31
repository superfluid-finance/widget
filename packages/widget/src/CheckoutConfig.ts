import { SuperTokenList } from "@superfluid-finance/tokenlist";
import { paymentDetailsSchema, productDetailsSchema } from "./core";
import { z } from "zod";

export const checoutConfigSchema = z.object({
  productDetails: productDetailsSchema,
  paymentDetails: paymentDetailsSchema,
});

export type CheckoutConfig = z.infer<typeof checoutConfigSchema> & {
  readonly tokenList: SuperTokenList; // TODO: move to zod schema
};
