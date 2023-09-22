import { colors, Fab, SelectChangeEvent, ThemeOptions } from "@mui/material";
import SuperfluidWidget, {
  PaymentDetails,
  ProductDetails,
  WalletManager,
} from "@superfluid-finance/widget";
import tokenList, {
  SuperTokenList,
  TokenInfo,
} from "@superfluid-finance/widget/tokenlist";
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

const mumbaiPermitTokens: TokenInfo[] = [
  {
    address: "0x50c988f2c2cce525cc2067c93b8c4a43ec62a166",
    name: "PERMIT: Super fUSDC Fake Token",
    symbol: "pfUSDCx",
    decimals: 18,
    chainId: 80001,
    extensions: {
      superTokenInfo: {
        type: "Wrapper",
        underlyingTokenAddress: "0x60974a03baaa984ea79f4590ac1e88aaae31158a",
      },
    },
    logoURI:
      "https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/usdc/icon.svg",
    tags: ["supertoken", "testnet"],
  },
  {
    address: "0x60974a03baaa984ea79f4590ac1e88aaae31158a",
    name: "PERMIT: fUSDC Fake Token",
    symbol: "pfUSDC",
    decimals: 18,
    chainId: 80001,
    logoURI:
      "https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/usdc/icon.svg",
    tags: ["permit", "underlying", "testnet"],
  },
];

export const goerliPermitTokens: TokenInfo[] = [
  {
    address: "0x19E6F96A887D0a27d60ef63942d7BF707fb1aD08",
    name: "PERMIT: Super fUSDC Fake Token",
    symbol: "pfUSDCx",
    decimals: 18,
    chainId: 5,
    extensions: {
      superTokenInfo: {
        type: "Wrapper",
        underlyingTokenAddress: "0xc3cA859682786B0f97Fa9c1239C249cbBb20cDaC",
      },
    },
    logoURI:
      "https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/usdc/icon.svg",
    tags: ["supertoken", "testnet"],
  },
  {
    address: "0xc3cA859682786B0f97Fa9c1239C249cbBb20cDaC",
    name: "PERMIT: fUSDC Fake Token",
    symbol: "pfUSDC",
    decimals: 18,
    chainId: 5,
    logoURI:
      "https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/usdc/icon.svg",
    tags: ["permit", "underlying", "testnet"],
  },
];

export const widgetTokenList = {
  ...tokenList,
  tokens: [...goerliPermitTokens, ...tokenList.tokens],
  // ...mumbaiPermitTokens,
} as SuperTokenList;

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
  paymentDetails: PaymentDetails,
  theme: ThemeOptions,
  walletManager: WalletManager,
  stepperOrientation: "vertical" | "horizontal",
) => {
  return layout === "page" ? (
    <SuperfluidWidget
      productDetails={productDetails}
      paymentDetails={paymentDetails}
      tokenList={widgetTokenList}
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
      tokenList={widgetTokenList}
      type={layout}
      theme={theme}
      walletManager={walletManager}
      stepper={{ orientation: stepperOrientation }}
    >
      {({ openModal }) => (
        <Fab
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
  const { displaySettings, paymentDetails, productDetails, type } = props;

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
          theme,
          walletManager,
          displaySettings.stepperOrientation,
        )}
    </WidgetContext.Provider>
  );
};

export default WidgetPreview;
