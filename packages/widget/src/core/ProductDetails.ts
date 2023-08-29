import { z } from "zod";

export const productDetailsSchema = z.object({
  /**
   * The name of the checkout product.
   */
  name: z.string(),
  /**
   * The description of the checkout product.
   */
  description: z.string().optional(),
  /**
   * The image URI of the checkout product. Can be an URL, can be a data URI (e.g. inline Base64).
   */
  imageURI: z.string().optional(),
  // # Success Button
  /**
   * Text shows on the success button in the final screen of the checkout.
   */
  successText: z.string().optional(),
  /**
   * The URL to redirect to when the success button is clicked.
   */
  successURL: z.string().optional(),
  // TODO(KK): Move success button related things to a separate object.
});

/**
 * The details of the checkout product.
 */
export interface ProductDetails extends z.infer<typeof productDetailsSchema> {}
