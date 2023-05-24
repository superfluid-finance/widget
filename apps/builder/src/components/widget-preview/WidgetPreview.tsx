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
  SuperfluidWidget,
  PaymentDetails,
  ProductDetails,
  WalletManager,
} from "@superfluid-finance/widget";
import tokenList from "@tokdaniel/supertokenlist";
import { useWeb3Modal } from "@web3modal/react";

export type DisplaySettings = {
  darkMode: boolean;
  containerRadius?: number;
  inputRadius: CSSProperties["borderRadius"];
  buttonRadius: CSSProperties["borderRadius"];
  fontFamily: string;
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
  paymentDetails: PaymentDetails & { defaultReceiverAddress: string };
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
    imageURI: "https://picsum.photos/200/200",
  },
  paymentDetails: {
    defaultReceiverAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    paymentOptions: [],
  },
  layout: "dialog",
  displaySettings: {
    darkMode: false,
    containerRadius: 4,
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
  theme: ThemeOptions,
  walletManager: WalletManager
) => {
  return layout === "page" ? (
    <SuperfluidWidget
      productDetails={productDetails}
      paymentDetails={paymentDetails}
      tokenList={tokenList}
      type={layout}
      theme={theme}
      walletManager={walletManager}
    />
  ) : (
    <SuperfluidWidget
      productDetails={productDetails}
      paymentDetails={paymentDetails}
      tokenList={tokenList}
      type={layout}
      theme={theme}
      walletManager={walletManager}
    >
      {({ openModal }) => (
        <Button onClick={() => openModal()}>{`Open ${layout}`}</Button>
      )}
    </SuperfluidWidget>
  );
};

export const mapDisplaySettingsToTheme = (
  layout: Layout,
  displaySettings: DisplaySettings
): ThemeOptions => ({
  palette: {
    mode: displaySettings.darkMode ? "dark" : "light",
    primary: { main: displaySettings.primaryColor },
    secondary: { main: displaySettings.secondaryColor },
  },
  shape: {
    borderRadius: displaySettings.containerRadius,
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

  const { open, isOpen } = useWeb3Modal();
  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen]
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const theme: ThemeOptions = mapDisplaySettingsToTheme(
    layout,
    displaySettings
  );

  return (
    <WidgetContext.Provider value={props}>
      {mounted &&
        switchLayout(
          layout,
          productDetails,
          paymentDetails,
          theme,
          walletManager
        )}
    </WidgetContext.Provider>
  );
};

export default WidgetPreview;
