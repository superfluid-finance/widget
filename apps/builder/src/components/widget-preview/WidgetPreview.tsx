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

import {
  CheckoutWidget,
  PaymentDetails,
  ProductDetails,
} from "superfluid-checkout-widget";
import tokenList from "@tokdaniel/superfluid-tokenlist";

export type DisplaySettings = {
  darkMode: boolean;
  inputRadius: CSSProperties["borderRadius"];
  buttonRadius: CSSProperties["borderRadius"];
  fontFamily: string;
  productImageURL?: string;
  logoURL?: string;
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

export type Layout = (typeof layouts)[number];

export type WidgetProps = {
  productDetails: ProductDetails;
  paymentDetails: PaymentDetails;
  displaySettings: DisplaySettings;
  layout: Layout;
};

export type WidgetState = {
  selectedPaymentOption: string;
  onPaymentOptionSelect: (event: SelectChangeEvent<string>) => void;
};

export const WidgetContext = createContext<WidgetProps>({
  productDetails: {
    name: "Product Name",
    description: "Product Description",
  },
  paymentDetails: {
    receiverAddress: "0x...",
    paymentOptions: [],
  },
  layout: "dialog",
  displaySettings: {
    darkMode: false,
    buttonRadius: 4,
    inputRadius: 4,
    fontFamily: "fontfamily",
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

export const mapDisplaySettingsToTheme = (
  displaySettings: DisplaySettings
): ThemeOptions => ({
  palette: {
    mode: displaySettings.darkMode ? "dark" : "light",
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
          borderRadius: displaySettings.buttonRadius,
        },
      },
    },
  },
});

const WidgetPreview: FC<WidgetProps> = (props) => {
  const { displaySettings, paymentDetails, productDetails, layout } = props;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const theme: ThemeOptions = mapDisplaySettingsToTheme(displaySettings);

  return (
    <WidgetContext.Provider value={props}>
      {mounted && switchLayout(layout, productDetails, paymentDetails, theme)}
    </WidgetContext.Provider>
  );
};

export default WidgetPreview;
