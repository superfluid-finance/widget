import isEqual from "lodash.isequal";
import uniqWith from "lodash.uniqwith";
import { z } from "zod";

import { paymentOptionSchema } from "./PaymentOption.js";

export const paymentDetailsSchema = z.object({
  wrapAmountMultiplier: z.number().int().min(1).default(3),
  paymentOptions: paymentOptionSchema
    .transform((x) => [x])
    .or(z.array(paymentOptionSchema).min(1))
    .refine(
      (paymentOptions) => {
        const initialList = paymentOptions.map((paymentOption) => {
          const { userData, ...rest } = paymentOption; // Remove user data from the comparison.
          return rest;
        });
        const uniqList = uniqWith(initialList, isEqual);
        return uniqList.length === initialList.length;
      },
      {
        message:
          "Payment options must be unique. Please remove the duplicates.",
      },
    ),
});

/**
 * The details of the payment options for the checkout flow.
 */
export interface PaymentDetails extends z.infer<typeof paymentDetailsSchema> {}
