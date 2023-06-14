import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Drawer,
  FormControlLabel,
  Stack,
  Switch,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { useState, useMemo } from "react";
import WidgetPreview, {
  WidgetProps,
} from "../components/widget-preview/WidgetPreview";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import WebIcon from "@mui/icons-material/Web";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import ExportEditor from "../components/export-editor/ExportEditor";
import ProductEditor from "../components/product-editor/ProductEditor";
import TermsAndPrivacy from "../components/terms-and-privacy/TermsAndPrivacy";
import UiEditor from "../components/ui-editor/UiEditor";
import useDemoMode from "../hooks/useDemoMode";
import CodeEditor from "../components/code-editor/CodeEditor";
import CodeIcon from "@mui/icons-material/Code";
import CloseIcon from "@mui/icons-material/Close";

const labelStyle = {
  fontWeight: 500,
};

export default function Home() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<"ui" | "product" | "export">(
    "product"
  );

  const { widgetProps, demoMode, toggleDemoMode } = useDemoMode();

  const formMethods = useForm<WidgetProps>({
    values: widgetProps,
  });

  const { watch, control, getValues, setValue } = formMethods;

  const [productDetails, paymentDetails, displaySettings, layout] = watch([
    "productDetails",
    "paymentDetails",
    "displaySettings",
    "layout",
  ]);

  const [isCodeEditorOpen, setCodeEditorOpen] = useState(false);

  return (
    <Stack direction="row" sx={{ position: "relative" }}>
      <Stack
        sx={{
          width: 600,
          height: "100vh",
        }}
      >
        <Stack direction="column" p={2} gap={2} sx={{ overflow: "auto" }}>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
            gap={1}
          >
            <Typography variant="h6" sx={labelStyle}>
              Widget Customization
            </Typography>
            <FormControlLabel
              control={<Switch checked={demoMode} onChange={toggleDemoMode} />}
              label={<Typography variant="subtitle2">Demo mode</Typography>}
            />
          </Stack>
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
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <Button
          variant="text"
          onClick={() => setCodeEditorOpen((isOpen) => !isOpen)}
          startIcon={<CodeIcon />}
        >
          Config Editor
        </Button>
      </Box>
      <Drawer
        open={isCodeEditorOpen}
        onClose={() => setCodeEditorOpen(false)}
        keepMounted={true}
        anchor="right"
        PaperProps={{
          sx: { width: 500 },
        }}
      >
        <Box py={2}>
          <Typography variant="h6" textAlign="center">
            Current Config
          </Typography>
        </Box>

        <CodeEditor value={getValues()} setValue={setValue} />
        <Button
          onClick={() => setCodeEditorOpen(false)}
          variant="text"
          endIcon={<CloseIcon />}
        >
          Close
        </Button>
      </Drawer>
    </Stack>
  );
}
