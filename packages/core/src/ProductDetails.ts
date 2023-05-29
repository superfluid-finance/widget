import { z } from "zod";

export const productDetailsSchema = z.object({
  name: z.string(),
  description: z.string(),
  imageURI: z.string().optional(),
  successURL: z.string().optional(),
});

export type ProductDetails = z.infer<typeof productDetailsSchema>;