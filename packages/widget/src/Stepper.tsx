import {
  Box,
  Container,
  Fade,
  Stepper as MUIStepper,
  Portal,
  Stack,
  Step,
  StepButton,
  StepConnector,
  StepContent,
  StepIcon,
  StepLabel,
  Zoom,
} from "@mui/material";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { CheckoutSummary } from "./CheckoutSummary";
import StepContentPaymentOption from "./StepContentPaymentOption";
import StepContentReview from "./StepContentReview";
import { StepContentTransactions } from "./StepContentTransactions";
import StepContentWrap from "./StepContentWrap";
import { StepperProvider } from "./StepperProvider";
import { DraftFormValues } from "./formValues";
import ExpandIcon from "./ExpandIcon";
import { useAccount } from "wagmi";

export default function Stepper() {
  const {
    watch,
    formState: { isValid },
  } = useFormContext<DraftFormValues>();

  const { isConnected } = useAccount();

  const paymentOptionWithTokenInfo = watch("paymentOptionWithTokenInfo");

  const visibleSteps = useMemo(
    () => [
      {
        buttonText: "Select network and token",
        shortText: "Network & Token",
        optional: false,
        Content: StepContentPaymentOption,
      },
      // Add wrap step only when Super Token has an underlying token.
      ...(paymentOptionWithTokenInfo?.superToken.extensions.superTokenInfo
        .type === "Wrapper"
        ? [
            {
              buttonText: "Wrap to Super Tokens",
              shortText: "Wrap",
              optional: true,
              Content: StepContentWrap,
            },
          ]
        : []),
      {
        buttonText: "Review the transaction(s)",
        shortText: "Review",
        optional: false,
        Content: StepContentReview,
      },
    ],
    [paymentOptionWithTokenInfo]
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

        return (
          <>
            {isTransacting && (
              <Fade in>
                <Box sx={{ mx: 3, mb: 3, mt: 2 }}>
                  <StepContentTransactions />
                </Box>
              </Fade>
            )}

            {isFinished && (
              <Zoom in={isFinished}>
                <Box sx={{ m: 3 }}>
                  <CheckoutSummary />
                </Box>
              </Zoom>
            )}

            <Fade in={isForm} appear={false}>
              <Box>
                {isForm && (
                  <MUIStepper
                    nonLinear={isConnected}
                    orientation={orientation}
                    activeStep={activeStep}
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
                          <StepButton
                            optional={step.optional ? "optional" : undefined}
                            onClick={() => setActiveStep(index)}
                          >
                            <StepLabel sx={{ position: "relative" }}>
                              {labelText}
                              {orientation === "vertical" && (
                                <ExpandIcon
                                  expanded={activeStep === index}
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
                )}
              </Box>
            </Fade>

            {/* // Keep in sync with the stepper */}
            <Fade in={isForm} appear={false} unmountOnExit={false}>
              {/* TODO: Unmount if not horizontal stepper? Creates a race-condition in Builder, FYI. */}
              <Box ref={container} />
            </Fade>
          </>
        );
      }}
    </StepperProvider>
  );
}
