import { z } from "zod";

import { chainIdSchema } from "../SupportedNetwork.js";

export const networkAssetInfoSchema = z.object({
  color: z
    .string()
    .trim()
    .transform((x) => x as `#${string}`),
  logoURI: z.string().trim().optional(),
});

export const networkAssetsSchema = z.record(
  chainIdSchema,
  networkAssetInfoSchema,
);
