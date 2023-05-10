import { Box, Stack, Tab, Typography, colors, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";

import WidgetPreview, {
  WidgetProps,
  layouts,
} from "../components/widget-preview/WidgetPreview";
import { useState } from "react";

import UiEditor from "../components/ui-editor/UiEditor";
import ExportEditor from "../components/export-editor/ExportEditor";
import PaymentEditor from "../components/payment-editor/PaymentEditor";

const labelStyle = {
  fontWeight: 500,
};

export default function Home() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<"ui" | "payment" | "export">("ui");

  const formMethods = useForm<WidgetProps, any, WidgetProps>({
    defaultValues: {
      productName: "Product Name",
      productDesc: "Product Description",
      paymentOptions: [],
      displaySettings: {
        buttonRadius: 4,
        inputRadius: 4,
        productImageURL: "",
        logoURL: "",
        fontFamily: "default",
        primaryColor: colors.green[500],
        secondaryColor: colors.blue[500],
      },
      layout: "dialog",
    },
  });

  const { watch, control, getValues, setValue } = formMethods;

  watch([
    "productName",
    "productDesc",
    "paymentOptions",
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
              <Tab label="UI" value="ui" />
              <Tab label="Payment" value="payment" />
              <Tab label="Export" value="export" />
            </TabList>

            <TabPanel value="ui">
              <UiEditor control={control} watch={watch} />
            </TabPanel>
            <TabPanel value="payment">
              <PaymentEditor control={control} watch={watch} />
            </TabPanel>
            <TabPanel value="export">
              <ExportEditor />
            </TabPanel>
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
        <WidgetPreview {...getValues()} />
      </Box>
    </Stack>
  );
}
