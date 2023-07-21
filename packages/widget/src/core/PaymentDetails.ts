import { z } from "zod";

import { paymentOptionSchema } from "./PaymentOption.js";

export const paymentDetailsSchema = z.object({
  paymentOptions: z.array(paymentOptionSchema).min(1),
});

export type PaymentDetails = z.infer<typeof paymentDetailsSchema>;
