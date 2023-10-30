import isEqual from "lodash.isequal";
import uniqWith from "lodash.uniqwith";
import { z } from "zod";

import { paymentOptionSchema } from "./PaymentOption.js";
import { timePeriods } from "./TimePeriod.js";

export const modifyFlowRateBehaviourSchema = z
  .string()
  .trim()
  .toUpperCase()
  .pipe(z.enum(["ADD", "SET", "ENSURE"]))
  .default("ADD");

/**
 * The behaviour to use when modifying the flow rate of the Superfluid stream.
 *
 * ADD - Always add more to the flow rate.
 * SET - Always set to the flow rate specified in the payment option. NOTE: This might reduce the flow rate. If you never want to reduce the flow rate then use ENSURE.
 * ENSURE - Only change the flow rate if it is less than the flow rate specified in the payment option. If it is then it will work like SET.
 */
export type ModifyFlowRateBehaviour = z.infer<
  typeof modifyFlowRateBehaviourSchema
>;

export const paymentDetailsSchema = z.object({
  modifyFlowRateBehaviour: modifyFlowRateBehaviourSchema,
  defaultWrapAmount: z
    .object({
      multiplier: z.number().int().min(1),
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
