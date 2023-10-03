import { colors, Fab, SelectChangeEvent, ThemeOptions } from "@mui/material";
import SuperfluidWidget, {
  PaymentOption,
  ProductDetails,
  WalletManager,
  WidgetProps as WidgetProps_,
} from "@superfluid-finance/widget";
import { extendedSuperTokenList } from "@superfluid-finance/widget/tokenlist";
import { useWeb3Modal } from "@web3modal/react";
import {
  createContext,
  CSSProperties,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import useFontLoader from "../../hooks/useFontLoader";

export const widgetBuilderTokenList = extendedSuperTokenList;

export interface FontSettings {
  family: string;
  category: string;
}

export type DisplaySettings = {
  stepperOrientation: "vertical" | "horizontal";
  darkMode: boolean;
  containerRadius?: number;
  inputRadius: CSSProperties["borderRadius"];
  buttonRadius: CSSProperties["borderRadius"];
  font: FontSettings | null;
  primaryColor: `rgb(${string})` | `#${string}`;
  secondaryColor: `rgb(${string})` | `#${string}`;
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
  paymentDetails: WidgetProps_["paymentDetails"] & {
    paymentOptions: PaymentOption[];
  };
  existentialNFT: WidgetProps_["existentialNFT"];
  displaySettings: DisplaySettings;
  type: Layout;
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
    paymentOptions: [],
  },
  existentialNFT: {
    name: "",
    symbol: "",
    owner: "",
    deployments: {},
  },
  type: "dialog",
  displaySettings: {
    stepperOrientation: "vertical",
    darkMode: false,
    containerRadius: 20,
    buttonRadius: 10,
    inputRadius: 10,
    font: {
      family: "Noto Sans",
      category: "sans-serif",
    },
    primaryColor: colors.green[500],
    secondaryColor: colors.common.white,
  },
});

export const useWidgetContext = () => useContext(WidgetContext);

const switchLayout = (
  layout: Layout,
  productDetails: ProductDetails,
  paymentDetails: WidgetProps_["paymentDetails"],
  existentialNFT: WidgetProps_["existentialNFT"],
  theme: ThemeOptions,
  walletManager: WalletManager,
  stepperOrientation: "vertical" | "horizontal",
) => {
  return layout === "page" ? (
    <SuperfluidWidget
      productDetails={productDetails}
      paymentDetails={paymentDetails}
      tokenList={widgetBuilderTokenList}
      existentialNFT={existentialNFT}
      type={layout}
      theme={theme}
      walletManager={walletManager}
      stepper={{ orientation: stepperOrientation }}
      eventListeners={{
        onTransactionSent: console.log,
      }}
    />
  ) : (
    <SuperfluidWidget
      productDetails={productDetails}
      paymentDetails={paymentDetails}
      existentialNFT={existentialNFT}
      tokenList={widgetBuilderTokenList}
      type={layout}
      theme={theme}
      walletManager={walletManager}
      stepper={{ orientation: stepperOrientation }}
    >
      {({ openModal }) => (
        <Fab
          data-testid="open-checkout-in-button"
          color="primary"
          variant="extended"
          onClick={() => openModal()}
        >{`Open Checkout in ${layout.toUpperCase()}`}</Fab>
      )}
    </SuperfluidWidget>
  );
};

export const mapDisplaySettingsToTheme = (
  displaySettings: DisplaySettings,
): ThemeOptions => ({
  ...(displaySettings.font
    ? {
        typography: {
          fontFamily: `'${displaySettings.font.family}', '${displaySettings.font.category}'`,
        },
      }
    : {}),
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
  const {
    displaySettings,
    paymentDetails,
    productDetails,
    existentialNFT,
    type,
  } = props;

  const { open, isOpen, setDefaultChain } = useWeb3Modal();
  const walletManager = useMemo<WalletManager>(
    () => ({
      open: ({ chain }) => {
        if (chain) {
          setDefaultChain(chain);
        }
        open();
      },
      isOpen,
    }),
    [open, isOpen, setDefaultChain],
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const theme: ThemeOptions = mapDisplaySettingsToTheme(displaySettings);

  useFontLoader(displaySettings.font?.family);

  return (
    <WidgetContext.Provider value={props}>
      {mounted &&
        switchLayout(
          type,
          productDetails,
          paymentDetails,
          existentialNFT,
          theme,
          walletManager,
          displaySettings.stepperOrientation,
        )}
    </WidgetContext.Provider>
  );
};

export default WidgetPreview;
