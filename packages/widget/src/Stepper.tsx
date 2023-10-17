import {
  Box,
  Collapse,
  Fade,
  Portal,
  Step,
  StepButton,
  StepConnector,
  StepContent,
  Stepper as MUIStepper,
} from "@mui/material";
import { useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { CheckoutSummary } from "./CheckoutSummary.js";
import { runEventListener } from "./EventListeners.js";
import { DraftFormValues } from "./formValues.js";
import StepContentPaymentOption from "./StepContentPaymentOption.js";
import StepContentPersonalData from "./StepContentPersonalData.js";
import StepContentReview from "./StepContentReview.js";
import { StepContentTransactions } from "./StepContentTransactions.js";
import StepContentWrap from "./StepContentWrap.js";
import { StepperProvider } from "./StepperProvider.js";
import { useWidget } from "./WidgetContext.js";

export type StepProps = {
  stepIndex: number;
};

export default function Stepper() {
  const { eventListeners } = useWidget();
  const {
    watch,
    formState: { isValid },
  } = useFormContext<DraftFormValues>();

  const [paymentOptionWithTokenInfo, personalData] = watch([
    "paymentOptionWithTokenInfo",
    "personalData",
  ]);

  const visibleSteps = useMemo(
    () =>
      [
        {
          buttonText: "Select network and token",
          shortText: "Network & Token",
          Content: StepContentPaymentOption,
        },
        ...(personalData && personalData.length > 0
          ? [
              {
                buttonText: "Personal Data",
                shortText: "Personal Data",
                Content: StepContentPersonalData,
              },
            ]
          : []),
        // Add wrap step only when Super Token has an underlying token.
        ...(paymentOptionWithTokenInfo?.superToken.extensions.superTokenInfo
          .type === "Wrapper" // TODO(KK): Enable native asset wrapping here.
          ? [
              {
                buttonText: "Wrap to Super Tokens",
                shortText: "Wrap",
                Content: StepContentWrap,
              },
            ]
          : []),
        {
          buttonText: "Review the transaction(s)",
          shortText: "Review",
          Content: StepContentReview,
        },
      ] as const,
    [paymentOptionWithTokenInfo, personalData],
  );

  const container = useRef(null);
  const totalSteps = visibleSteps.length + 2; // Add confirm and success. TODO(KK): not clean...
  const transactionStep = totalSteps - 2;
  const summaryStep = totalSteps - 1;

  return (
    <StepperProvider
      totalSteps={totalSteps}
      initialStep={isValid ? visibleSteps.length - 1 : 0}
    >
      {({ activeStep, setActiveStep, orientation }) => {
        const isTransacting = activeStep === transactionStep;
        const isFinished = activeStep === summaryStep;
        const isForm = !isTransacting && !isFinished;
        const visualActiveStep = Math.min(2, activeStep);

        return (
          <>
            <Collapse data-testid="widget-preview" in={isForm} appear={false}>
              <Fade in={isForm} appear={false}>
                <Box>
                  <MUIStepper
                    orientation={orientation}
                    activeStep={visualActiveStep}
                    connector={
                      orientation === "horizontal" ? <StepConnector /> : null
                    }
                    sx={{
                      ...(orientation === "horizontal"
                        ? {
                            pt: 2.5,
                            pb: 1,
                            px: 3,
                          }
                        : {}),
                    }}
                  >
                    {visibleSteps.map((step, index) => {
                      const { Content: Content_ } = step;

                      const Content =
                        orientation === "vertical" ? (
                          <StepContent>
                            <Content_ stepIndex={index} />
                          </StepContent>
                        ) : activeStep === index ? (
                          <Portal container={container.current}>
                            <Content_ stepIndex={index} />
                          </Portal>
                        ) : null;

                      const labelText =
                        orientation === "vertical"
                          ? step.buttonText
                          : step.shortText;

                      return (
                        <Step data-testid={`step-${index + 1}`} key={index}>
                          <StepButton
                            disabled={visualActiveStep <= index}
                            data-testid={`step-${index + 1}-button`}
                            onClick={() => {
                              runEventListener(eventListeners.onButtonClick, {
                                type: "step_label",
                              });
                              setActiveStep(index);
                            }}
                            sx={(theme) => ({
                              position: "relative",
                              width: "100%",
                              ...(orientation === "vertical"
                                ? {
                                    "&:hover": {
                                      bgcolor: theme.palette.action.hover,
                                    },
                                  }
                                : {
                                    pl: 0,
                                  }),
                            })}
                          >
                            {labelText}
                          </StepButton>
                          {Content}
                        </Step>
                      );
                    })}
                  </MUIStepper>
                </Box>
              </Fade>
            </Collapse>

            {/* // Keep in sync with the stepper */}
            <Collapse in={isForm} appear={false} unmountOnExit={false}>
              <Fade in={isForm} appear={false} unmountOnExit={false}>
                {/* TODO: Unmount if not horizontal stepper? Creates a race-condition in Builder, FYI. */}
                <Box ref={container} />
              </Fade>
            </Collapse>

            <Collapse in={isFinished} unmountOnExit>
              <Fade in={isFinished}>
                <Box sx={{ m: 3 }}>
                  <CheckoutSummary />
                </Box>
              </Fade>
            </Collapse>

            <Collapse in={isTransacting} unmountOnExit>
              <Fade in={isTransacting}>
                <Box sx={{ mx: 3, mb: 3, mt: 2 }}>
                  <StepContentTransactions stepIndex={transactionStep} />
                </Box>
              </Fade>
            </Collapse>
          </>
        );
      }}
    </StepperProvider>
  );
}
