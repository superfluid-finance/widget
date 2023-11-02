import {
  ProductDetails,
  WidgetProps,
  WidgetThemeOptions,
} from "@superfluid-finance/widget";

import { Layout } from "../components/widget-preview/WidgetPreview";

export type ExportJSON = {
  productDetails: ProductDetails;
  paymentDetails: WidgetProps["paymentDetails"];
  type: Layout;
  theme: WidgetThemeOptions;
};
