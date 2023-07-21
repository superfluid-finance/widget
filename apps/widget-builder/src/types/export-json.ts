import { ThemeOptions } from "@mui/material";
import { PaymentDetails, ProductDetails } from "@superfluid-finance/widget";

import { Layout } from "../components/widget-preview/WidgetPreview";

export type ExportJSON = {
  productDetails: ProductDetails;
  paymentDetails: PaymentDetails;
  type: Layout;
  theme: Omit<ThemeOptions, "unstable_strictMode" | "unstable_sxConfig">;
};
