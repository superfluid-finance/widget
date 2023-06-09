import {
  addressSchema,
  supportedNetworkSchema,
  etherAmountSchema,
  paymentOptionSchema,
  flowRateSchema,
} from "./core";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { SuperTokenInfo } from "@superfluid-finance/tokenlist";

const paymentOptionWithTokenInfoSchema = z.object({
  paymentOption: paymentOptionSchema,
  superToken: z.custom<SuperTokenInfo>(),
});

export type PaymentOptionWithTokenInfo = z.infer<
  typeof paymentOptionWithTokenInfoSchema
>;

export const checkoutFormSchema = z.object({
  accountAddress: addressSchema,
  network: supportedNetworkSchema,
  paymentOptionWithTokenInfo: paymentOptionWithTokenInfoSchema,
  flowRate: flowRateSchema.refine((x) => BigInt(x.amountEther) > 0n),
  wrapAmountEther: etherAmountSchema,
  enableAutoWrap: z.boolean().optional(),
});

export type ValidFormValues = z.infer<typeof checkoutFormSchema>;
export type DraftFormValues = NullableKeys<
  ValidFormValues,
  "accountAddress" | "network" | "paymentOptionWithTokenInfo"
>;
export type FormReturn = UseFormReturn<DraftFormValues, any, ValidFormValues>;

export type NullableKeys<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: T[P] | null;
};
