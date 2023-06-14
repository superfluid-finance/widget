import { Address } from "viem";
import { z } from "zod";
import { timePeriods } from "./TimePeriod";
import { chainIdSchema } from "./SupportedNetwork";

export const addressSchema = z.custom<Address>((val) => {
  return /^0x[a-fA-F0-9]{40}$/.test(val as string);
});

export const tokenSchema = z.object({
  address: addressSchema,
});

export const etherAmountSchema = z
  .string()
  .refine(
    (value) => {
      const parsed = Number(value);
      return !isNaN(parsed) && String(parsed) === value;
    },
    {
      message: "Must be a string representing a number",
    }
  )
  .transform((x) => x.toString() as `${number}`);

export const flowRateSchema = z.object({
  amountEther: etherAmountSchema,
  period: z.enum(timePeriods),
});

export const paymentOptionSchema = z.object({
  receiverAddress: addressSchema,
  chainId: chainIdSchema,
  superToken: tokenSchema,
  flowRate: flowRateSchema,
});

export type PaymentOption = z.infer<typeof paymentOptionSchema>;
