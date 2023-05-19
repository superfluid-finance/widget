import { TokenList } from "@uniswap/token-lists";
import {
  paymentDetailsSchema,
  productDetailsSchema,
} from "superfluid-checkout-core";
import { z } from "zod";

export const checoutConfigSchema = z.object({
  productDetails: productDetailsSchema,
  paymentDetails: paymentDetailsSchema,
});

export type CheckoutConfig = z.infer<typeof checoutConfigSchema> & {
  readonly tokenList: TokenList; // TODO: move to zod schema
};
