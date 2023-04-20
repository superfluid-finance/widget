import { z } from "zod";
import { ChainId, chainIds } from "../networkDefinitions";
import { Address } from "wagmi";
import { timePeriods } from "./TimePeriod";

export const etherAmountSchema = z.string();

export const addressSchema = z.custom<Address>((val) => {
  return /^0x[a-fA-F0-9]{40}$/.test(val as string);
});

export const flowRateSchema = z.object({
  amountEther: etherAmountSchema,
  period: z.enum(timePeriods),
});

type FlowRate = z.infer<typeof flowRateSchema>;

export const tokenSchema = z.object({
  address: addressSchema
});

type Token = z.infer<typeof tokenSchema>;

export const superTokenSchema = tokenSchema.merge(
  z.object({
    underlyingTokenAddress: addressSchema.nullable(),
  })
);

type SuperToken = z.infer<typeof superTokenSchema>;

export const paymentOptionSchema = z.object({
  superToken: superTokenSchema,
  flowRate: flowRateSchema,
});

export type PaymentOption = z.infer<typeof paymentOptionSchema>;

export const chainIdSchema = z.custom<ChainId>((value) => {
  return chainIds.includes(Number(value) as ChainId);
});

export const productInfoSchema = z.object({
  name: z.string(),
  description: z.string(),
  paymentOptions: z.record(chainIdSchema, z.array(paymentOptionSchema)),
});

export type ProductInfo = z.infer<typeof productInfoSchema>;