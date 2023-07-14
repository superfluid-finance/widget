import {
  addressSchema,
  supportedNetworkSchema,
  etherAmountSchema,
  paymentOptionSchema,
  flowRateSchema,
} from "./core";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { SuperTokenInfo, TokenInfo } from "@superfluid-finance/tokenlist";
import { parseEther } from "viem";

const paymentOptionWithTokenInfoSchema = z.object({
  paymentOption: paymentOptionSchema,
  superToken: z.custom<SuperTokenInfo>(),
  underlyingToken: z.custom<TokenInfo>().nullable(),
});

export type PaymentOptionWithTokenInfo = z.infer<
  typeof paymentOptionWithTokenInfoSchema
>;

export const checkoutFormSchema = z.object({
  accountAddress: addressSchema,
  network: supportedNetworkSchema,
  paymentOptionWithTokenInfo: paymentOptionWithTokenInfoSchema,
  flowRate: flowRateSchema.refine((x) => parseEther(x.amountEther) > 0n, {
    message: "Flow rate must be greater than 0.",
  }),
  wrapAmountInUnits: etherAmountSchema.refine((x) => parseEther(x) >= 0n, {
    message: "Wrap amount can't be negative.",
  }),
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
