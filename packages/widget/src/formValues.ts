import {
  addressSchema,
  supportedNetworkSchema,
  etherAmountSchema,
  paymentOptionSchema,
} from "superfluid-checkout-core";
import { z } from "zod";
import { SuperTokenInfo } from "./CheckoutContext";
import { UseFormReturn } from "react-hook-form";

const paymentOptionWithTokenInfoSchema = z.object({
  paymentOption: paymentOptionSchema,
  superToken: z.custom<SuperTokenInfo>(),
});

export type PaymentOptionWithTokenInfo = z.infer<
  typeof paymentOptionWithTokenInfoSchema
>;

export const checkoutFormSchema = z.object({
  senderAddress: addressSchema,
  network: supportedNetworkSchema,
  paymentOptionWithTokenInfo: paymentOptionWithTokenInfoSchema,
  wrapAmountEther: etherAmountSchema,
  enableAutoWrap: z.boolean(),
  receiverAddress: addressSchema,
});

export type ValidFormValues = z.infer<typeof checkoutFormSchema>;
export type DraftFormValues = NullableObject<ValidFormValues>;
export type FormReturn = UseFormReturn<DraftFormValues, any, ValidFormValues>;

type NullableObject<T> = {
  [P in keyof T]: T[P] | null;
};