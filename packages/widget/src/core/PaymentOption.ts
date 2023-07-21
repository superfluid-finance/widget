import { formatEther, getAddress, parseEther } from "viem";
import { z } from "zod";
import { timePeriods } from "./TimePeriod.js";
import { chainIdSchema } from "./SupportedNetwork.js";

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

export const paymentOptionSchema = z.object({
  receiverAddress: addressSchema,
  chainId: chainIdSchema,
  superToken: tokenSchema,
  flowRate: flowRateSchema.optional(),
  userData: z
    .string()
    .transform((x) => x.toString() as `0x${string}`)
    .optional(),
});

export type PaymentOption = z.infer<typeof paymentOptionSchema>;
export type FlowRate = z.infer<typeof flowRateSchema>;
