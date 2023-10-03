import { z } from "zod";

import { addressSchema } from "./PaymentOption.js";
import { chainIdSchema } from "./SupportedNetwork.js";

export const existentialNFTSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  owner: addressSchema.or(z.string().refine((s) => s === "")),
  image: z.string().optional(),
  deployments: z.record(chainIdSchema, addressSchema.or(z.null())),
});

/**
 * The details of the payment options for the checkout flow.
 */
export interface ExistentialNFT extends z.input<typeof existentialNFTSchema> {}
