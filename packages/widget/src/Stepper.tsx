import {
  Box,
  Collapse,
  Fade,
  Stepper as MUIStepper,
  Portal,
  Step,
  StepButton,
  StepConnector,
  StepContent,
  StepLabel,
} from "@mui/material";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { CheckoutSummary } from "./CheckoutSummary";
import ExpandIcon from "./ExpandIcon";
import StepContentPaymentOption from "./StepContentPaymentOption";
import StepContentReview from "./StepContentReview";
import { StepContentTransactions } from "./StepContentTransactions";
import StepContentWrap from "./StepContentWrap";
import { StepperProvider } from "./StepperProvider";
import { DraftFormValues } from "./formValues";

export default function Stepper() {
  const {
    watch,
    formState: { isValid },
  } = useFormContext<DraftFormValues>();

  const paymentOptionWithTokenInfo = watch("paymentOptionWithTokenInfo");

  const visibleSteps = useMemo(
    () => [
      {
        buttonText: "Select network and token",
        shortText: "Network & Token",
        Content: StepContentPaymentOption,
      },
      // Add wrap step only when Super Token has an underlying token.
      ...(paymentOptionWithTokenInfo?.superToken.extensions.superTokenInfo
        .type === "Wrapper"
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
    ],
    [paymentOptionWithTokenInfo],
  );

  const container = React.useRef(null);
  const totalSteps = visibleSteps.length + 2; // Add confirm and success. TODO(KK): not clean...

  return (
    <StepperProvider
      totalSteps={totalSteps}
      initialStep={isValid ? visibleSteps.length - 1 : 0}
    >
      {({ activeStep, setActiveStep, orientation }) => {
        const isTransacting = activeStep === totalSteps - 2;
        const isFinished = activeStep === totalSteps - 1;
        const isForm = !isTransacting && !isFinished;
        const visualActiveStep = Math.min(2, activeStep);

        return (
          <>
            <Collapse in={isForm} appear={false}>
              <Fade in={isForm} appear={false}>
                <Box>
                  <MUIStepper
                    orientation={orientation}
                    activeStep={visualActiveStep}
                    connector={
                      orientation === "vertical" ? null : <StepConnector />
                    }
                  >
                    {visibleSteps.map((step, index) => {
                      const { Content: Content_ } = step;

                      const Content =
                        orientation === "vertical" ? (
                          <StepContent>
                            <Content_ />
                          </StepContent>
                        ) : activeStep === index ? (
                          <Portal container={container.current}>
                            <Content_ />
                          </Portal>
                        ) : null;

                      const labelText =
                        orientation === "vertical"
                          ? step.buttonText
                          : step.shortText;

                      return (
                        <Step key={index}>
                          <StepButton onClick={() => setActiveStep(index)}>
                            <StepLabel
                              sx={{ position: "relative", width: "100%" }}
                            >
                              {labelText}
                              {orientation === "vertical" && (
                                <ExpandIcon
                                  expanded={visualActiveStep === index}
                                  sx={{
                                    position: "absolute",
                                    top: "calc(50% - 0.5em)",
                                    right: 28,
                                  }}
                                />
                              )}
                            </StepLabel>
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
                  <StepContentTransactions />
                </Box>
              </Fade>
            </Collapse>
          </>
        );
      }}
    </StepperProvider>
  );
}
