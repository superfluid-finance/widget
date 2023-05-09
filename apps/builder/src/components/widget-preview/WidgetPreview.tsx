import { Card } from "@mui/material";
import {
  Button,
  Select,
  MenuItem,
  Stack,
  Theme,
  Typography,
  TextField,
} from "@mui/material";
import { FC, createContext, useContext, useEffect, useMemo } from "react";
import { Network, networks } from "../../networkDefinitions";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { TokenInfo } from "@uniswap/token-lists";
import { BigNumber } from "ethers";
import { PaymentOption } from "./SelectPaymentOption";
import WidgetDialog from "./WidgetDialog";
import { WidgetContentProps } from "./WidgetContent";
import WidgetDrawer from "./WidgetDrawer";
import WidgetFullScreen from "./WidgetFullScreen";

export type PaymentInterval =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export const layouts = ["dialog", "drawer", "fullscreen"] as const;

export type Layout = (typeof layouts)[number];

export type WidgetData = {
  productName: string;
  productDesc: string;
  paymentOptions: PaymentOption[];
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

const getWidgetLayout = (
  layout: WidgetProps["data"]["layout"],
  props: WidgetContentProps,
  drawerProps: {
    isOpen: boolean;
  }
) => {
  switch (layout) {
    case "dialog":
      return <WidgetDialog {...props} />;
    case "drawer":
      return <WidgetDrawer {...props} {...drawerProps} />;
    case "fullscreen":
      return <WidgetFullScreen {...props} />;
    default:
      return <WidgetDialog {...props} />;
  }
};
export type WidgetProps = {
  data: WidgetData;
  drawer: {
    isOpen: boolean;
  };
};
const WidgetPreview: FC<WidgetProps> = ({ data, drawer }) => {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<string>("");

  const handlePaymentOptionSelect = (
    event: SelectChangeEvent<typeof selectedPaymentOption>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedPaymentOption(value);
  };

  const widgetContentProps: WidgetContentProps = {
    selectedPaymentOption: selectedPaymentOption,
    onPaymentOptionSelect: handlePaymentOptionSelect,
  };

  return (
    <WidgetContext.Provider value={data}>
      {getWidgetLayout(data.layout, widgetContentProps, drawer)}
    </WidgetContext.Provider>
  );
};

export default WidgetPreview;
