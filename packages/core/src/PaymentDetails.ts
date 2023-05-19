import { z } from "zod";
import { addressSchema, paymentOptionSchema } from "./PaymentOption";

export const paymentDetailsSchema = z.object({
  receiverAddress: addressSchema,
  paymentOptions: z.array(paymentOptionSchema).min(1),
});

export type PaymentDetails = z.infer<typeof paymentDetailsSchema>;
