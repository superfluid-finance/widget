import CodeIcon from "@mui/icons-material/Code";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import WebIcon from "@mui/icons-material/Web";
import WebAssetIcon from "@mui/icons-material/WebAsset";
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
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import ConfigEditorDrawer from "../components/config-editor/ConfigEditorDrawer";
import ExportEditor from "../components/export-editor/ExportEditor";
import ProductEditor from "../components/product-editor/ProductEditor";
import StreamGatingEditor from "../components/stream-gating-editor/StreamGatingEditor";
import TermsAndPrivacy from "../components/terms-and-privacy/TermsAndPrivacy";
import UiEditor from "../components/ui-editor/UiEditor";
import WidgetPreview, {
  WidgetProps,
} from "../components/widget-preview/WidgetPreview";
import useDemoMode from "../hooks/useDemoMode";

const drawerWidth = "480px";

export default function Builder() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<
    "ui" | "product" | "export" | "nft"
  >("product");

  const { widgetProps, demoMode, toggleDemoMode } = useDemoMode();

  const formMethods = useForm<WidgetProps>({
    values: widgetProps,
  });

  const { watch, control, getValues, setValue } = formMethods;

  const [productDetails, paymentDetails, displaySettings, type] = watch([
    "productDetails",
    "paymentDetails",
    "displaySettings",
    "type",
  ]);

  const [isConfigEditorOpen, setConfigEditorOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", position: "relative", height: "100vh" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            px: 3.5,
            pt: 3.5,
            pb: 1,
          }}
          gap={1}
        >
          <Typography variant="subtitle1" fontWeight="500">
            Widget Builder
          </Typography>
          <FormControlLabel
            data-testid="demo-mode-switch"
            control={<Switch checked={demoMode} onChange={toggleDemoMode} />}
            label={<Typography>Demo</Typography>}
          />
        </Stack>

        <TabContext value={activeTab}>
          <TabList onChange={(_, value) => setActiveTab(value)} sx={{ px: 2 }}>
            <Tab label="1. Product" value="product" data-testid="product-tab" />
            <Tab label="2. UI" value="ui" data-testid="ui-tab" />
            <Tab label="3. Export" value="export" data-testid="export-tab" />
            <Tab label="4. NFT" value="nft" data-testid="nft-tab" />
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
            <TabPanel value="nft">
              <StreamGatingEditor />
            </TabPanel>
          </FormProvider>
        </TabContext>
      </Drawer>
      <Stack
        component="main"
        alignItems="center"
        sx={{
          flexGrow: 1,
          position: "relative",
          py: "8vh",
          overflow: "auto",
        }}
      >
        <Box textAlign="center" sx={{ mb: 6.5 }}>
          <Typography variant="h5" color="grey.900" sx={{ mb: 1 }}>
            Widget Preview
          </Typography>
          <Typography color="grey.800">
            In this preview you can see all the changes you apply in the builder
            menu.
          </Typography>
          <Typography color="grey.800">
            This is how your checkout will look once you export it.
          </Typography>
        </Box>
        <WidgetPreview
          {...{
            productDetails,
            paymentDetails,
            displaySettings,
            type,
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
            name="type"
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
      </Stack>
      <TermsAndPrivacy />
      <Box sx={{ position: "absolute", top: 5, right: 5 }}>
        <Button
          variant="text"
          onClick={() => setConfigEditorOpen((isOpen) => !isOpen)}
          startIcon={<CodeIcon />}
        >
          JSON Editor
        </Button>
      </Box>
      <ConfigEditorDrawer
        value={getValues()}
        setValue={setValue}
        isOpen={isConfigEditorOpen}
        setIsOpen={setConfigEditorOpen}
      />
    </Box>
  );
}
