import { Stepper as MUIStepper, Step, StepButton } from "@mui/material";
import { StepperProvider } from "./StepperProvider";
import StepContent1 from "./StepContent1";
import StepContent2 from "./StepContent2";
import StepContent3 from "./StepContent3";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";

export default function CheckoutStepper() {
  const { watch } = useFormContext<DraftFormValues>();
  const paymentOptionWithTokenInfo = watch("paymentOptionWithTokenInfo");

  const steps = useMemo(
    () => [
      {
        buttonText: "Select network and token",
        optional: false,
        content: StepContent1,
      },
      // Add wrap step only when Super Token has an underlying token.
      ...(paymentOptionWithTokenInfo?.superToken.extensions.superTokenInfo
        .underlyingTokenAddress
        ? [
            {
              buttonText: "Wrap",
              optional: true,
              content: StepContent2,
            },
          ]
        : []),
      {
        buttonText: "Review the transaction",
        optional: false,
        content: StepContent3,
      },
    ],
    [paymentOptionWithTokenInfo]
  );

  return (
    <StepperProvider totalSteps={steps.length}>
      {({ activeStep, setActiveStep }) => (
        <MUIStepper orientation="vertical" activeStep={activeStep} sx={{ m: 2 }}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepButton
                optional={step.optional ? "optional" : undefined}
                onClick={() => setActiveStep(index)}
              >
                {step.buttonText}
              </StepButton>
              {step.content && <step.content />}
            </Step>
          ))}
        </MUIStepper>
      )}
    </StepperProvider>
  );
}
