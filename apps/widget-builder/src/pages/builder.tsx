import CodeIcon from "@mui/icons-material/Code";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import WebIcon from "@mui/icons-material/Web";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  FormControlLabel,
  MobileStepper,
  Paper,
  Stack,
  Switch,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import ConfigEditorDrawer from "../components/config-editor/ConfigEditorDrawer";
import ExportEditor from "../components/export-editor/ExportEditor";
import PaymentEditor from "../components/payment-editor/PaymentEditor";
import ProductEditor from "../components/product-editor/ProductEditor";
import TermsAndPrivacy from "../components/terms-and-privacy/TermsAndPrivacy";
import UiEditor from "../components/ui-editor/UiEditor";
import WidgetPreview, {
  WidgetProps,
} from "../components/widget-preview/WidgetPreview";
import useDemoMode from "../hooks/useDemoMode";

const drawerWidth = "480px";

export default function Builder() {
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const stepCount = 4;
  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, stepCount - 1),
    );
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

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
        <TabContext value={activeStep.toString()}>
          <AppBar position="sticky" color="primary" elevation={3}>
            <Stack
              component={Toolbar}
              // bgcolor="primary.main"
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
              gap={1}
            >
              <Typography variant="subtitle1" component="h1" fontWeight="500">
                Checkout Builder
              </Typography>
              <FormControlLabel
                data-testid="demo-mode-switch"
                control={
                  <Switch
                    color="secondary"
                    checked={demoMode}
                    onChange={toggleDemoMode}
                  />
                }
                label="Demo Mode"
              />
            </Stack>
            <Box bgcolor="background.paper">
              <TabList
                variant="fullWidth"
                onChange={(_, value) => setActiveStep(Number(value))}
              >
                <Tab label="1. Product" value="0" data-testid="product-tab" />
                <Tab label="2. Payment" value="1" data-testid="payment-tab" />
                <Tab label="3. UI" value="2" data-testid="ui-tab" />
                <Tab label="4. Export" value="3" data-testid="export-tab" />
              </TabList>
            </Box>
          </AppBar>

          <Box height="100%">
            <FormProvider {...formMethods}>
              <TabPanel value="0">
                <ProductEditor />
              </TabPanel>
              <TabPanel value="1">
                <PaymentEditor />
              </TabPanel>
              <TabPanel value="2">
                <UiEditor />
              </TabPanel>
              <TabPanel value="3">
                <ExportEditor />
              </TabPanel>
            </FormProvider>
          </Box>

          <Paper
            sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <MobileStepper
              sx={{
                bgcolor: "background.paper",
              }}
              variant="text"
              steps={stepCount}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === stepCount - 1}
                >
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </Paper>
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
