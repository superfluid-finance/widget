import { z } from "zod";
import { paymentOptionSchema } from "./PaymentOption";

export const paymentDetailsSchema = z.object({
  paymentOptions: z.array(paymentOptionSchema).min(1),
});

export type PaymentDetails = z.infer<typeof paymentDetailsSchema>;
