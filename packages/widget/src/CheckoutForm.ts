import { TokenInfo } from "@uniswap/token-lists";
import {
  addressSchema,
  supportedNetworkSchema,
  etherAmountSchema,
  paymentOptionSchema,
} from "superfluid-checkout-core";
import { z } from "zod";

const paymentOptionWithTokenInfoSchema = z.object({
    paymentOption: paymentOptionSchema,
    tokenInfo: z.custom<TokenInfo>()
});

export type PaymentOptionWithTokenInfo = z.infer<typeof paymentOptionWithTokenInfoSchema>;

export const checkoutFormSchema = z.object({
  senderAddress: addressSchema,
  network: supportedNetworkSchema,
  paymentOptionWithTokenInfo: paymentOptionWithTokenInfoSchema,
  wrapAmountEther: etherAmountSchema,
  enableAutoWrap: z.boolean(),
  receiverAddress: addressSchema,
});

export type CheckoutForm = z.infer<typeof checkoutFormSchema>;
export type CheckoutFormDraft = NullableObject<CheckoutForm>;

type NullableObject<T> = {
  [P in keyof T]: T[P] | null;
};