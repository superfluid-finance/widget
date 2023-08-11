import { z } from "zod";

import { paymentOptionSchema } from "./PaymentOption.js";

export const paymentDetailsSchema = z.object({
  paymentOptions: paymentOptionSchema
    .transform((x) => [x])
    .or(z.array(paymentOptionSchema).min(1)),
});

/**
 * The details of the payment options for the checkout flow.
 */
export interface PaymentDetails extends z.infer<typeof paymentDetailsSchema> {}
