import { FC, createContext, useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { Button, SelectChangeEvent } from "@mui/material";

import { PaymentOption as SelectPaymentOption } from "./SelectPaymentOption";
import {
  ChainId,
  CheckoutProvider,
  PaymentOption,
  ProductDetails,
} from "superfluid-checkout-widget";
import tokenList from "../../tokenList";
import { Control, UseFormWatch } from "react-hook-form";

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

export type WidgetData = {
  productName: string;
  productDesc: string;
  paymentOptions: SelectPaymentOption[];
  labels: {
    paymentOption: string;
    send: string;
  };
  layout: Layout;
};

export type WidgetState = {
  selectedPaymentOption: string;
  onPaymentOptionSelect: (event: SelectChangeEvent<string>) => void;
};

export const WidgetContext = createContext<WidgetProps["data"]>({
  productName: "Product Name",
  productDesc: "Product Description",
  paymentOptions: [],
  labels: {
    paymentOption: "Pay with",
    send: "Send",
  },
  layout: "dialog",
});

export const useWidgetContext = () => useContext(WidgetContext);

const switchLayout = (
  layout: Layout,
  productDetails: ProductDetails,
  paymentOptions: PaymentOption[]
) => {
  return layout === "page" ? (
    <CheckoutProvider
      productDetails={productDetails}
      paymentOptions={paymentOptions}
      tokenList={tokenList}
      type={layout}
    />
  ) : (
    <CheckoutProvider
      productDetails={productDetails}
      paymentOptions={paymentOptions}
      tokenList={tokenList}
      type={layout}
    >
      {({ openModal }) => (
        <Button onClick={() => openModal()}>{`Open ${layout}`}</Button>
      )}
    </CheckoutProvider>
  );
};

export type WidgetProps = {
  data: WidgetData;
};
const WidgetPreview: FC<WidgetProps> = ({ data }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const productDetails: ProductDetails = useMemo(
    () => ({
      name: data.productName,
      description: data.productDesc,
    }),
    [data.productName, data.productDesc]
  );

  const paymentOptions: PaymentOption[] = useMemo(
    () =>
      data.paymentOptions.map((x) => ({
        chainId: x.network.chainId as ChainId,
        superToken: {
          address: x.superToken.address as `0x${string}`,
        },
        flowRate: {
          amountEther: "1",
          period: "month",
        },
      })),
    [data.paymentOptions]
  );

  return (
    <WidgetContext.Provider value={data}>
      {mounted && switchLayout(data.layout, productDetails, paymentOptions)}
    </WidgetContext.Provider>
  );
};

export default WidgetPreview;
