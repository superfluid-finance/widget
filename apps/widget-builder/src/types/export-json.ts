import { ThemeOptions } from "@mui/material";
import { ProductDetails, WidgetProps } from "@superfluid-finance/widget";

import { Layout } from "../components/widget-preview/WidgetPreview";

export type ExportJSON = {
  productDetails: ProductDetails;
  paymentDetails: WidgetProps["paymentDetails"];
  type: Layout;
  theme: Omit<ThemeOptions, "unstable_strictMode" | "unstable_sxConfig">;
};
