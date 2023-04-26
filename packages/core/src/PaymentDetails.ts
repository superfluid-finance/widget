import { z } from "zod";
import { addressSchema, paymentOptionSchema } from "./PaymentOption";

export const paymentDetailsSchema = z.object({
  receiverAddress: addressSchema,
  paymentOptions: z.array(paymentOptionSchema),
});

export type PaymentDetails = z.infer<typeof paymentDetailsSchema>;
