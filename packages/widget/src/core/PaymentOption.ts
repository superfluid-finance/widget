import { formatEther, getAddress, parseEther } from "viem";
import { z } from "zod";

import { chainIdSchema } from "./SupportedNetwork.js";
import { timePeriods } from "./TimePeriod.js";

export const addressSchema = z
  .string()
  .trim()
  .transform((value, ctx) => {
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

export const etherAmountSchema = z
  .string()
  .trim()
  .transform((x, ctx) => {
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
    transferAmountEther: etherAmountSchema
      .optional()
      .refine((x) => (x ? parseEther(x) > 0n : true), {
        message:
          "Upfront transfer amount must be greater than 0 when specified.",
      }),
    flowRate: flowRateSchema
      .optional()
      .refine((x) => (x ? parseEther(x.amountEther) > 0n : true), {
        message: "Flow rate must be greater than 0.",
      }),
    userData: z
      .string()
      .trim()
      .transform((x) => x.toString() as `0x${string}`)
      .optional(),
  })
  .refine(
    (data) =>
      !data.transferAmountEther ||
      Boolean(data.transferAmountEther && data.flowRate),
    {
      path: ["transferAmount"],
      message:
        "The upfront payment can only be defined with a fixed flow rate.",
    },
  );

/**
 * The details of a single payment option for the checkout flow.
 */
export interface PaymentOption extends z.infer<typeof paymentOptionSchema> {}

export type FlowRate = z.infer<typeof flowRateSchema>;
