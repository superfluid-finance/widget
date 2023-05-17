import { Box, Stack, Tab, Typography, colors, useTheme } from "@mui/material";
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

const labelStyle = {
  fontWeight: 500,
};

export default function Home() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<"ui" | "product" | "export">(
    "product"
  );

  const formMethods = useForm<WidgetProps, any, WidgetProps>({
    defaultValues: {
      productDetails: {
        name: "Product Name",
        description: "Product Description",
      },
      paymentDetails: {
        receiverAddress: "0x...",
        paymentOptions: [],
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
        <Stack mt="auto" p={2}>
          <Controller
            control={control}
            name="layout"
            render={({ field: { value, onChange } }) => (
              <TabContext value={value}>
                <TabList
                  onChange={(_, value) => onChange({ target: { value } })}
                >
                  {layouts.map((layout) => (
                    <Tab value={layout} label={layout} key={layout} />
                  ))}
                </TabList>
              </TabContext>
            )}
          ></Controller>
        </Stack>
      </Stack>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.grey[900],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
      </Box>
    </Stack>
  );
}
