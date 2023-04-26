import { Address } from "abitype";
import { z } from "zod";
import { timePeriods } from "./TimePeriod";

export const addressSchema = z.custom<Address>((val) => {
  return /^0x[a-fA-F0-9]{40}$/.test(val as string);
});

export const tokenSchema = z.object({
  address: addressSchema,
});

export const chainIds = [
  5, 80001, 420, 421613, 43113, 100, 137, 10, 42161, 43114, 56, 1, 42220,
] as const;

export type ChainId = typeof chainIds[number];

export const chainIdSchema = z.custom<ChainId>((value) => {
  return chainIds.some((x) => x === (Number(value) as ChainId));
});

export const etherAmountSchema = z.string();

export const flowRateSchema = z.object({
  amountEther: etherAmountSchema,
  period: z.enum(timePeriods),
});

export const paymentOptionSchema = z.object({
  chainId: chainIdSchema,
  superToken: tokenSchema,
  flowRate: flowRateSchema,
});

export type PaymentOption = z.infer<typeof paymentOptionSchema>;