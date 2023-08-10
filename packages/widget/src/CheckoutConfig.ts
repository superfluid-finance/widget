import { ThemeOptions } from "@mui/material";
import { SuperTokenList } from "@superfluid-finance/tokenlist";
import { z } from "zod";

import {
  PaymentDetails,
  paymentDetailsSchema,
  ProductDetails,
  productDetailsSchema,
} from "./core/index.js";
import { EventListeners } from "./EventListeners.js";
import { WalletManager } from "./WalletManager.js";

export const checkoutConfigSchema = z.object({
  /**
   * @inheritdoc ProductDetails
   */
  productDetails: productDetailsSchema.transform((x) => x as ProductDetails),
  /**
   * @inheritdoc PaymentDetails
   */
  paymentDetails: paymentDetailsSchema.transform((x) => x as PaymentDetails),
  /**
   * The token list that contains Super Tokens and their underlying tokens.
   */
  tokenList: z.custom<SuperTokenList>().optional(),
});

export interface CheckoutConfig extends z.infer<typeof checkoutConfigSchema> {}

const widgetPropsSchema = checkoutConfigSchema.merge(
  z.object({
    /**
     * The MUI theme object to style the widget. Learn more about it from the MUI documentation: https://mui.com/material-ui/customization/default-theme/
     */
    theme: z
      .custom<Omit<ThemeOptions, "unstable_strictMode" | "unstable_sxConfig">>()
      .optional(),
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
  }),
);

export interface WidgetProps extends z.infer<typeof widgetPropsSchema> {}
