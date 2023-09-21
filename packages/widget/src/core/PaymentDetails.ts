import isEqual from "lodash.isequal";
import uniqWith from "lodash.uniqwith";
import { z } from "zod";

import { paymentOptionSchema } from "./PaymentOption.js";
import { timePeriods } from "./TimePeriod.js";

export const paymentDetailsSchema = z.object({
  defaultWrapAmount: z
    .object({
      multiplier: z.number().int().min(1).default(3),
      period: z.enum(timePeriods).optional(),
    })
    .default({
      multiplier: 3,
      period: "month",
    }),
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
