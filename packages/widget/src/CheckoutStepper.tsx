import { Stepper, Step, StepButton } from "@mui/material";
import { StepperProvider } from "./StepperProvider";
import CheckoutStepContent1 from "./CheckoutStepContent1";
import CheckoutStepContent2 from "./CheckoutStepContent2";
import CheckoutStepContent3 from "./CheckoutStepContent3";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { CheckoutFormDraft } from "./CheckoutForm";

export default function CheckoutStepper() {
  const { watch } = useFormContext<CheckoutFormDraft>();
  const paymentOptionWithTokenInfo = watch("paymentOptionWithTokenInfo");

  const steps = useMemo(
    () => [
      {
        buttonText: "Select network and token",
        optional: false,
        content: CheckoutStepContent1,
      },
      // Add wrap step only when Super Token has an underlying token.
      ...(paymentOptionWithTokenInfo?.superToken.extensions.superTokenInfo
        .underlyingTokenAddress
        ? [
            {
              buttonText: "Wrap",
              optional: true,
              content: CheckoutStepContent2,
            },
          ]
        : []),
      {
        buttonText: "Review the transaction",
        optional: false,
        content: CheckoutStepContent3,
      },
    ],
    [paymentOptionWithTokenInfo]
  );

  return (
    <StepperProvider totalSteps={steps.length}>
      {({ activeStep, setActiveStep }) => (
        <Stepper orientation="vertical" activeStep={activeStep} sx={{ m: 2 }}>
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
        </Stepper>
      )}
    </StepperProvider>
  );
}
