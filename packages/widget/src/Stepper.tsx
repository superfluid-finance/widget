import { Stepper as MUIStepper, Step, StepButton } from "@mui/material";
import { StepperProvider } from "./StepperProvider";
import StepContentPaymentOption from "./StepContentPaymentOption";
import StepContentWrap from "./StepContentWrap";
import StepContentReview from "./StepContentReview";
import { useMemo } from "react";
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
        optional: false,
        Content: StepContentPaymentOption,
      },
      // Add wrap step only when Super Token has an underlying token.
      ...(paymentOptionWithTokenInfo?.superToken.extensions.superTokenInfo
        .type === "Wrapper"
        ? [
            {
              buttonText: "Wrap into Super Token",
              optional: true,
              Content: StepContentWrap,
            },
          ]
        : []),
      {
        buttonText: "Review the transaction(s)",
        optional: false,
        Content: StepContentReview,
      },
      {
        buttonText: "Confirm the transaction(s)",
        optional: false,
        Content: StepContentTransactions,
      },
    ],
    [paymentOptionWithTokenInfo]
  );

  const { isConnected } = useAccount();

  return (
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
          <MUIStepper
            orientation="vertical"
            activeStep={activeStep}
            sx={{ m: 2 }}
          >
            {steps.map((step, index) => {
              const { Content } = step;
              return (
                <Step key={index}>
                  <StepButton
                    optional={step.optional ? "optional" : undefined}
                    onClick={() => setActiveStep(index)}
                  >
                    {step.buttonText}
                  </StepButton>
                  <Content />
                </Step>
              );
            })}
          </MUIStepper>
        );
      }}
    </StepperProvider>
  );
}
