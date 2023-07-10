import { z } from "zod";

export const productDetailsSchema = z.object({
  name: z.string(),
  description: z.string(),
  imageURI: z.string().optional(),
  // # Success Button
  successText: z.string().optional(),
  successURL: z.string().optional(),
  // TODO(KK): Move success button related things to a separate object.
});

export type ProductDetails = z.infer<typeof productDetailsSchema>;
