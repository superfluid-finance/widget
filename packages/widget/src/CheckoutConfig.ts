import { SuperTokenList } from "@superfluid-finance/tokenlist";
import { z } from "zod";

import { Callbacks } from "./Callbacks.js";
import {
  NetworkAssets,
  PaymentDetails,
  paymentDetailsSchema,
  ProductDetails,
  productDetailsSchema,
} from "./core/index.js";
import { personalDataSchema } from "./core/PersonalData.js";
import { EventListeners } from "./EventListeners.js";
import { WidgetThemeOptions } from "./theme.js";
import { WalletManager } from "./WalletManager.js";

export const checkoutConfigSchema = z.object({
  /**
   * @inheritdoc PaymentDetails
   */
  paymentDetails: paymentDetailsSchema.transform((x) => x as PaymentDetails),
  /**
   * @inheritdoc ProductDetails
   */
  productDetails: productDetailsSchema.transform((x) => x as ProductDetails),
  /**
   * The token list that contains Super Tokens and their underlying tokens.
   */
  tokenList: z.custom<SuperTokenList>(),
});

export interface CheckoutConfig extends z.infer<typeof checkoutConfigSchema> {}

const widgetPropsSchema = z.object({
  /**
   * @inheritdoc PaymentDetails
   */
  paymentDetails: paymentDetailsSchema,
  /**
   * @inheritdoc ProductDetails
   */
  productDetails: productDetailsSchema.optional(),
  /**
   * The token list that contains Super Tokens and their underlying tokens.
   */
  tokenList: z.custom<SuperTokenList>().optional(),
  /**
   * The MUI theme object to style the widget. Learn more about it from the MUI documentation: https://mui.com/material-ui/customization/default-theme/
   */
  theme: z.custom<WidgetThemeOptions>().optional(),
  personalData: personalDataSchema.optional(),
  /**
   * Whether the stepper UI component inside the widget is vertical or horizontal. Vertical is better supported.
   */
  stepper: z
    .custom<{
      orientation: "vertical" | "horizontal";
    }>()
    .optional(),
  /**
   * @inheritdoc WalletManager
   */
  walletManager: z.custom<WalletManager>().optional(),
  /**
   * @inheritdoc EventListeners
   */
  eventListeners: z.custom<EventListeners>().optional(),
  callbacks: z.custom<Callbacks>().optional(),
  networkAssets: z.custom<NetworkAssets>().optional(),
});

export interface WidgetProps extends z.input<typeof widgetPropsSchema> {}
