import {
  Box,
  Container,
  Stepper as MUIStepper,
  Orientation,
  Portal,
  Step,
  StepButton,
  StepContent,
  StepperProps,
} from "@mui/material";
import { StepperProvider } from "./StepperProvider";
import StepContentPaymentOption from "./StepContentPaymentOption";
import StepContentWrap from "./StepContentWrap";
import StepContentReview from "./StepContentReview";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import { useAccount } from "wagmi";
import { StepContentTransactions } from "./StepContentTransactions";

export default function Stepper() {
  const {
    watch,
    formState: { isValid },
  } = useFormContext<DraftFormValues>();
  const paymentOptionWithTokenInfo = watch("paymentOptionWithTokenInfo");

  const steps = useMemo(
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
              buttonText: "Wrap into Super Token",
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
      {
        buttonText: "Confirm the transaction(s)",
        shortText: "Confirm",
        optional: false,
        Content: StepContentTransactions,
      },
    ],
    [paymentOptionWithTokenInfo]
  );

  const { isConnected } = useAccount();

  // TODO: clean up the orientation logic.
  const orientation: Orientation = "vertical";
  const container = React.useRef(null);

  return (
    <>
      <StepperProvider
        totalSteps={steps.length}
        initialStep={isValid ? steps.length - 1 : 0}
      >
        {({ activeStep, setActiveStep }) => {
          // TODO(KK): Check if React whines over this.
          if (activeStep !== 0 && !isConnected) {
            setActiveStep(0);
          }

          return (
            <>
              <MUIStepper
                orientation={orientation}
                activeStep={activeStep}
                sx={{ m: 2 }}
              >
                {steps.map((step, index) => {
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
                        {labelText}
                      </StepButton>
                      {Content}
                    </Step>
                  );
                })}
              </MUIStepper>
              {orientation === "horizontal" && (
                <Container ref={container} sx={{ my: 2 }}></Container>
              )}
            </>
          );
        }}
      </StepperProvider>
    </>
  );
}
