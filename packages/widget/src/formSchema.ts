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

export const validFormSchema = z.object({
  senderAddress: addressSchema,
  network: supportedNetworkSchema,
  paymentOptionWithTokenInfo: paymentOptionWithTokenInfoSchema,
  wrapAmountEther: etherAmountSchema,
  enableAutoWrap: z.boolean(),
  receiverAddress: addressSchema,
});

export type ValidForm = z.infer<typeof validFormSchema>;
export type DraftForm = NullableObject<ValidForm>;

type NullableObject<T> = {
  [P in keyof T]: T[P] | null;
};