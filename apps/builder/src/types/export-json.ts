import { PaymentDetails, ProductDetails } from "superfluid-checkout-widget";
import { Layout } from "../components/widget-preview/WidgetPreview";
import { ThemeOptions } from "@mui/material";

export type ExportJSON = {
  productDetails: ProductDetails;
  paymentDetails: PaymentDetails;
  layout: Layout;
  theme: Omit<ThemeOptions, "unstable_strictMode" | "unstable_sxConfig">;
};
