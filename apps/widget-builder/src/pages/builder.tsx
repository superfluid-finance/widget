import CodeIcon from "@mui/icons-material/Code";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  MobileStepper,
  Paper,
  Stack,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import ConfigEditorDrawer from "../components/config-editor/ConfigEditorDrawer";
import ExportEditor from "../components/export-editor/ExportEditor";
import PaymentEditor from "../components/payment-editor/PaymentEditor";
import ProductEditor from "../components/product-editor/ProductEditor";
import TermsAndPrivacy from "../components/terms-and-privacy/TermsAndPrivacy";
import UiEditor from "../components/ui-editor/UiEditor";
import WidgetPreview, {
  WidgetProps,
} from "../components/widget-preview/WidgetPreview";
import useAnalyticsBrowser from "../hooks/useAnalyticsBrowser";
import { defaultWidgetProps } from "../hooks/useDemoMode";

const drawerWidth = "480px";

const tabLabels: Record<number, string> = {
  0: "Product",
  1: "Payment",
  2: "Styling",
  3: "Export",
};

export default function Builder() {
  const [activeStep, setActiveStep] = useState(0);
  const stepCount = 4;
  const lastStep = stepCount - 1;
  const isLastStep = activeStep === lastStep;
  const isFirstStep = activeStep === 0;

  const ajs = useAnalyticsBrowser();

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, lastStep));
    ajs.track("next_step", { currentTab: tabLabels[activeStep] });
  }, [ajs, activeStep]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
    ajs.track("previous_step", { currentTab: tabLabels[activeStep] });
  }, [ajs, activeStep]);

  const formMethods = useForm<WidgetProps>({
    values: defaultWidgetProps,
  });

  const { watch, control, getValues, setValue } = formMethods;

  const [productDetails, paymentDetails, displaySettings, type] = watch([
    "productDetails",
    "paymentDetails",
    "displaySettings",
    "type",
  ]);

  const [isConfigEditorOpen, setConfigEditorOpen] = useState(false);

  const onTabChange = useCallback(
    (_: React.SyntheticEvent, value: string) => {
      const tabNumber = Number(value);
      setActiveStep(tabNumber);
      ajs.track("tab_changed", { tab: tabLabels[tabNumber] });
    },
    [ajs],
  );

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
            <Stack component={Toolbar} justifyContent="center">
              <Typography variant="h6" component="h1">
                Checkout Builder
              </Typography>
            </Stack>
            <Box bgcolor="background.paper">
              <TabList variant="fullWidth" onChange={onTabChange}>
                <Tab label={tabLabels[0]} value="0" data-testid="product-tab" />
                <Tab label={tabLabels[1]} value="1" data-testid="payment-tab" />
                <Tab label={tabLabels[2]} value="2" data-testid="ui-tab" />
                <Tab label={tabLabels[3]} value="3" data-testid="export-tab" />
              </TabList>
            </Box>
          </AppBar>

          <Box
            height="100%"
            sx={{
              overflowY: "scroll",
            }}
          >
            <FormProvider {...formMethods}>
              <TabPanel value="0" sx={{ height: "100%" }}>
                <ProductEditor />
              </TabPanel>
              <TabPanel value="1" sx={{ height: "100%" }}>
                <PaymentEditor />
              </TabPanel>
              <TabPanel value="2" sx={{ height: "100%" }}>
                <UiEditor />
              </TabPanel>
              <TabPanel value="3" sx={{ height: "100%" }}>
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
              variant="dots"
              steps={stepCount}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  onClick={handleNext}
                  disabled={isLastStep}
                  sx={{
                    visibility: isLastStep ? "hidden" : "visible",
                  }}
                >
                  Next
                  <KeyboardArrowRightIcon />
                </Button>
              }
              backButton={
                <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  onClick={handleBack}
                  disabled={isFirstStep}
                  sx={{
                    visibility: isFirstStep ? "hidden" : "visible",
                  }}
                >
                  <KeyboardArrowLeftIcon />
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
      </Stack>
      <TermsAndPrivacy />
      <Box sx={{ position: "absolute", top: 5, right: 5 }}>
        <Button
          variant="outlined"
          onClick={() => setConfigEditorOpen((isOpen) => !isOpen)}
          startIcon={<CodeIcon />}
          sx={{
            bgcolor: "background.paper",
          }}
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
