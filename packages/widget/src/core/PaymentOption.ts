import { formatEther, getAddress, parseEther } from "viem";
import { z } from "zod";

import { chainIdSchema } from "./SupportedNetwork.js";
import { timePeriods } from "./TimePeriod.js";

export const addressSchema = z.string().transform((value, ctx) => {
  try {
    return getAddress(value);
  } catch {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not an address.",
    });
    return z.NEVER;
  }
});

export const tokenSchema = z.object({
  address: addressSchema,
});

export const etherAmountSchema = z.string().transform((x, ctx) => {
  try {
    return formatEther(parseEther(x)) as `${number}`;
  } catch {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not an ether amount.",
    });
    return z.NEVER;
  }
});

export const flowRateSchema = z.object({
  amountEther: etherAmountSchema,
  period: z.enum(timePeriods),
});

export const paymentOptionSchema = z
  .object({
    receiverAddress: addressSchema,
    chainId: chainIdSchema,
    superToken: tokenSchema,
    transferAmount: etherAmountSchema.optional(), // TODO(KK): Is "transferAmount" the best name for this? Make valid only with a flow rate.
    flowRate: flowRateSchema.optional(), // TODO(KK): validate "not 0"
    userData: z
      .string()
      .transform((x) => x.toString() as `0x${string}`)
      .optional(),
  })
  .refine(
    (data) => data.transferAmount !== undefined && data.flowRate !== undefined,
    {
      path: ["transferAmount", "flowRate"],
      message:
        "The upfront payment can only be defined with a fixed flow rate.",
    },
  );

/**
 * The details of a single payment option for the checkout flow.
 */
export interface PaymentOption extends z.infer<typeof paymentOptionSchema> {}

export type FlowRate = z.infer<typeof flowRateSchema>;
