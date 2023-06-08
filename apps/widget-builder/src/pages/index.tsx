import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Stack,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  colors,
  useTheme,
} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { useState } from "react";
import WidgetPreview, {
  WidgetProps,
} from "../components/widget-preview/WidgetPreview";

import { faker } from "@faker-js/faker";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import WebIcon from "@mui/icons-material/Web";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { supportedNetwork } from "@superfluid-finance/widget";
import ExportEditor from "../components/export-editor/ExportEditor";
import ProductEditor from "../components/product-editor/ProductEditor";
import TermsAndPrivacy from "../components/terms-and-privacy/TermsAndPrivacy";
import UiEditor from "../components/ui-editor/UiEditor";
import { widgetFont } from "../theme";

const labelStyle = {
  fontWeight: 500,
};

export default function Home() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<"ui" | "product" | "export">(
    "product"
  );

  const formMethods = useForm<WidgetProps>({
    defaultValues: {
      productDetails: {
        name: `${faker.commerce.productName()}`,
        description: `${faker.commerce.productDescription()}`,
        imageURI: "https://picsum.photos/200/200",
      },
      paymentDetails: {
        defaultReceiverAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // vitalik.eth
        paymentOptions: [
          {
            receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22", // rebounder
            chainId: supportedNetwork.goerli.id,
            superToken: {
              address: "0x8ae68021f6170e5a766be613cea0d75236ecca9a", // fUSDCx
            },
            flowRate: {
              amountEther: "1",
              period: "month",
            },
          } as const,
          {
            receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22", // rebounder
            chainId: supportedNetwork.goerli.id,
            superToken: {
              address: "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00", // fDAIx
            },
            flowRate: {
              amountEther: "1",
              period: "month",
            },
          } as const,
          {
            receiverAddress: "0x7d3e32ae08f50387a83cf222e08d8ec26317d7aa", // vitalik.eth
            chainId: supportedNetwork.goerli.id,
            superToken: {
              address: "0x7d3e32ae08f50387a83cf222e08d8ec26317d7aa", // ZYA
            },
            flowRate: {
              amountEther: "1",
              period: "month",
            },
          } as const,
          {
            receiverAddress: "0x7d3e32ae08f50387a83cf222e08d8ec26317d7aa", // vitalik.eth
            chainId: supportedNetwork.goerli.id,
            superToken: {
              address: "0xcc48a0349077b91ab540d2e46addffb4a4a26251", // NTDL
            },
            flowRate: {
              amountEther: "1",
              period: "month",
            },
          } as const,
          {
            receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22", // rebounder
            chainId: supportedNetwork.polygonMumbai.id,
            superToken: {
              address: "0x42bb40bf79730451b11f6de1cba222f17b87afd7", // fUSDCx
            },
            flowRate: {
              amountEther: "1",
              period: "month",
            },
          } as const,
          {
            receiverAddress: "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f", // rebounder
            chainId: supportedNetwork.polygonMumbai.id,
            superToken: {
              address: "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f", // fDAIx
            },
            flowRate: {
              amountEther: "1",
              period: "month",
            },
          } as const,
          {
            receiverAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // vitalik.eth
            chainId: supportedNetwork.celo.id,
            superToken: {
              address: "0x62b8b11039fcfe5ab0c56e502b1c372a3d2a9c7a", // G$
            },
            flowRate: {
              amountEther: "1",
              period: "month",
            },
          } as const,
        ],
      },
      layout: "page",
      displaySettings: {
        darkMode: false,
        containerRadius: 20,
        buttonRadius: 10,
        inputRadius: 10,
        font: {
          family: "Noto Sans",
          category: "sans-serif",
        },
        primaryColor: "#1DB227",
        secondaryColor: colors.common.white,
        stepperOrientation: "vertical",
      },
    },
  });

  const { watch, control } = formMethods;

  const [productDetails, paymentDetails, displaySettings, layout] = watch([
    "productDetails",
    "paymentDetails",
    "displaySettings",
    "layout",
  ]);

  return (
    <Stack direction="row" sx={{ position: "relative" }}>
      <Stack
        sx={{
          width: 600,
          height: "100vh",
        }}
      >
        <Stack direction="column" p={2} gap={2} sx={{ overflow: "auto" }}>
          <Typography variant="h6" sx={labelStyle}>
            Widget Customization
          </Typography>
          <TabContext value={activeTab}>
            <TabList onChange={(_, value) => setActiveTab(value)}>
              <Tab label="Product" value="product" />
              <Tab label="UI" value="ui" />
              <Tab label="Export" value="export" />
            </TabList>
            <FormProvider {...formMethods}>
              <TabPanel value="ui">
                <UiEditor />
              </TabPanel>
              <TabPanel value="product">
                <ProductEditor />
              </TabPanel>
              <TabPanel value="export">
                <ExportEditor />
              </TabPanel>
            </FormProvider>
          </TabContext>
        </Stack>
      </Stack>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.grey[50],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <WidgetPreview
          {...{
            productDetails,
            paymentDetails,
            displaySettings,
            layout,
          }}
        />
        <Box
          sx={{
            position: "fixed",
            left: "calc(50%-96px)",
            backgroundColor: theme.palette.common.white,
            bottom: 0,
            borderRadius: 1,
            zIndex: 100,
          }}
        >
          <Controller
            control={control}
            name="layout"
            render={({ field: { value, onChange } }) => (
              <ToggleButtonGroup
                value={value}
                exclusive
                onChange={(_, value) => onChange(value)}
                sx={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <ToggleButton value="dialog" aria-label="dialog" title="Dialog">
                  <WebAssetIcon />
                </ToggleButton>
                <ToggleButton value="drawer" aria-label="drawer" title="Drawer">
                  <ViewSidebarIcon />
                </ToggleButton>
                <ToggleButton
                  value="full-screen"
                  aria-label="full-screen"
                  title="Full Screen"
                >
                  <FullscreenIcon />
                </ToggleButton>
                <ToggleButton value="page" aria-label="page" title="Page">
                  <WebIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          />
        </Box>
      </Box>
      <TermsAndPrivacy />
    </Stack>
  );
}
