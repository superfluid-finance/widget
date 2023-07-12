import { Address, formatEther, getAddress, parseEther } from "viem";
import { z } from "zod";
import { timePeriods } from "./TimePeriod";
import { chainIdSchema } from "./SupportedNetwork";

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

export const etherAmountToBigInt = z
  .string()
  .transform((x, ctx) => {
    try {
      return parseEther(x);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not an ether amount.",
      });
      return z.NEVER;
    }
  })
  .pipe(z.bigint()); // TODO(KK): The gt check might be better suited somewhere else.

export const etherAmountSchema = etherAmountToBigInt.transform(
  (x) => formatEther(x) as `${number}`,
);

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
