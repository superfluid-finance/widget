import { FC, createContext, useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { Button, SelectChangeEvent, colors } from "@mui/material";

import { PaymentOption as SelectPaymentOption } from "./SelectPaymentOption";
import {
  ChainId,
  CheckoutProvider,
  PaymentOption,
  ProductDetails,
} from "superfluid-checkout-widget";
import tokenList from "../../tokenList";
import { Control, UseFormWatch } from "react-hook-form";
import { DisplaySettings } from "superfluid-checkout-widget/src/ViewProvider";

export type PaymentInterval =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export const layouts = ["dialog", "drawer", "full-screen", "page"] as const;

export type EditorProps = {
  control: Control<WidgetProps, any>;
  watch: UseFormWatch<WidgetProps>;
};

export type Layout = (typeof layouts)[number];

export type WidgetProps = {
  productName: string;
  productDesc: string;
  paymentOptions: SelectPaymentOption[];
  displaySettings: DisplaySettings;
  layout: Layout;
};

export type WidgetState = {
  selectedPaymentOption: string;
  onPaymentOptionSelect: (event: SelectChangeEvent<string>) => void;
};

export const WidgetContext = createContext<WidgetProps>({
  productName: "Product Name",
  productDesc: "Product Description",
  paymentOptions: [],
  layout: "dialog",
  displaySettings: {
    buttonRadius: 4,
    inputRadius: 4,
    fontFamily: "fontfamily",
    primaryTextColor: colors.grey[900],
    secondaryTextColor: colors.amber[700],
    primaryColor: colors.green[500],
    secondaryColor: colors.common.white,
  },
});

export const useWidgetContext = () => useContext(WidgetContext);

const switchLayout = (
  layout: Layout,
  productDetails: ProductDetails,
  paymentOptions: PaymentOption[],
  displaySettings: DisplaySettings
) => {
  return layout === "page" ? (
    <CheckoutProvider
      productDetails={productDetails}
      paymentOptions={paymentOptions}
      tokenList={tokenList}
      type={layout}
      displaySettings={displaySettings}
    />
  ) : (
    <CheckoutProvider
      productDetails={productDetails}
      paymentOptions={paymentOptions}
      tokenList={tokenList}
      type={layout}
      displaySettings={displaySettings}
    >
      {({ openModal }) => (
        <Button onClick={() => openModal()}>{`Open ${layout}`}</Button>
      )}
    </CheckoutProvider>
  );
};

const WidgetPreview: FC<WidgetProps> = (props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const productDetails: ProductDetails = useMemo(
    () => ({
      name: props.productName,
      description: props.productDesc,
    }),
    [props.productName, props.productDesc]
  );

  const paymentOptions: PaymentOption[] = useMemo(
    () =>
      props.paymentOptions.map((x) => ({
        chainId: x.network.chainId as ChainId,
        superToken: {
          address: x.superToken.address as `0x${string}`,
        },
        flowRate: {
          amountEther: "1",
          period: "month",
        },
      })),
    [props.paymentOptions]
  );

  return (
    <WidgetContext.Provider value={props}>
      {mounted &&
        switchLayout(
          props.layout,
          productDetails,
          paymentOptions,
          props.displaySettings
        )}
    </WidgetContext.Provider>
  );
};

export default WidgetPreview;
