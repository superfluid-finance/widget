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
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Controller, FormProvider, useForm } from "react-hook-form";

import WidgetPreview, {
  WidgetProps,
  layouts,
} from "../components/widget-preview/WidgetPreview";
import { useState } from "react";

import UiEditor from "../components/ui-editor/UiEditor";
import ExportEditor from "../components/export-editor/ExportEditor";
import ProductEditor from "../components/payment-editor/ProductEditor";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import WebIcon from "@mui/icons-material/Web";

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
        name: "Product Name",
        description: "Product Description",
      },
      paymentDetails: {
        receiverAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        paymentOptions: [
          {
            chainId: 5,
            superToken: {
              address: "0x8ae68021f6170e5a766be613cea0d75236ecca9a" as const
            },
            flowRate: {
              amountEther: "1" as `${number}`,
              period: "month",
            },
          },
          {
            chainId: 5,
            superToken: {
              address: "0x7d3e32ae08f50387a83cf222e08d8ec26317d7aa" as const
            },
            flowRate: {
              amountEther: "1" as `${number}`,
              period: "month",
            },
          },
        ],
      },
      layout: "page",
      displaySettings: {
        darkMode: false,
        buttonRadius: 4,
        inputRadius: 4,
        fontFamily: "fontfamily",
        primaryColor: colors.green[500],
        secondaryColor: colors.common.white,
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
    <Stack direction="row">
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
          backgroundColor: theme.palette.grey[900],
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
    </Stack>
  );
}
