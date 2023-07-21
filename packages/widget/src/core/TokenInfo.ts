import { z } from "zod";
import { addressSchema } from "./PaymentOption.js";

const WrapperSchema = z.object({
  type: z.literal("Wrapper"),
  underlyingTokenAddress: addressSchema,
});

const PureSchema = z.object({
  type: z.literal("Pure"),
  underlyingTokenAddress: z.undefined(),
});

const NativeAssetSchema = z.object({
  type: z.literal("Native Asset"),
  underlyingTokenAddress: z.undefined(),
});

const superTokenExtensionSchema = z.discriminatedUnion("type", [
  WrapperSchema,
  PureSchema,
  NativeAssetSchema,
]);

export type SuperTokenExtension = z.infer<typeof superTokenExtensionSchema>;
