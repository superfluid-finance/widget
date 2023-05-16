import {
  CSSProperties,
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useState } from "react";
import { Button, SelectChangeEvent, ThemeOptions, colors } from "@mui/material";

import { PaymentOption as SelectPaymentOption } from "./SelectPaymentOption";
import {
  ChainId,
  CheckoutWidget,
  PaymentDetails,
  PaymentOption,
  ProductDetails,
} from "superfluid-checkout-widget";
import tokenList from "../../tokenList";
import { Control, UseFormWatch } from "react-hook-form";

export type DisplaySettings = {
  inputRadius: CSSProperties["borderRadius"];
  buttonRadius: CSSProperties["borderRadius"];
  fontFamily: string;
  productImageURL?: string;
  logoURL?: string;
  primaryTextColor: `#${string}`;
  secondaryTextColor: `#${string}`;
  primaryColor: `#${string}`;
  secondaryColor: `#${string}`;
};

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
  paymentReceiver: `0x${string}`;
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
  paymentReceiver: "0x...",
  paymentOptions: [],
  layout: "dialog",
  displaySettings: {
    buttonRadius: 4,
    inputRadius: 4,
    fontFamily: "fontfamily",
    primaryTextColor: colors.grey[900],
    secondaryTextColor: colors.common.white,
    primaryColor: colors.green[500],
    secondaryColor: colors.common.white,
  },
});

export const useWidgetContext = () => useContext(WidgetContext);

const switchLayout = (
  layout: Layout,
  productDetails: ProductDetails,
  paymentDetails: PaymentDetails,
  theme: ThemeOptions
) => {
  return layout === "page" ? (
    <CheckoutWidget
      productDetails={productDetails}
      paymentDetails={paymentDetails}
      tokenList={tokenList}
      type={layout}
      theme={theme}
    />
  ) : (
    <CheckoutWidget
      productDetails={productDetails}
      paymentDetails={paymentDetails}
      tokenList={tokenList}
      type={layout}
      theme={theme}
    >
      {({ openModal }) => (
        <Button onClick={() => openModal()}>{`Open ${layout}`}</Button>
      )}
    </CheckoutWidget>
  );
};

const WidgetPreview: FC<WidgetProps> = (props) => {
  const { displaySettings } = props;
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

  const paymentDetails: PaymentDetails = useMemo<PaymentDetails>(() => ({
    receiverAddress: props.paymentReceiver,
    paymentOptions
  }), [props.paymentReceiver, paymentOptions])

  const theme = {
    palette: {
      text: {
        primary: displaySettings.primaryTextColor,
        secondary: displaySettings.secondaryTextColor,
      },
      primary: { main: displaySettings.primaryColor },
      secondary: { main: displaySettings.secondaryColor },
    },
    components: {
      MuiStepIcon: {
        styleOverrides: {
          text: {
            fill: displaySettings.secondaryColor,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: displaySettings.inputRadius,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: displaySettings.secondaryTextColor,
            borderRadius: displaySettings.buttonRadius,
          },
        },
      },
    },
  };

  return (
    <WidgetContext.Provider value={props}>
      {mounted &&
        switchLayout(props.layout, productDetails, paymentDetails, theme)}
    </WidgetContext.Provider>
  );
};

export default WidgetPreview;
