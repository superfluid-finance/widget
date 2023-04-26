import { z } from "zod";

export const productDetailsSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type ProductDetails = z.infer<typeof productDetailsSchema>;