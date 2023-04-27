import { Stepper, Step, StepButton } from "@mui/material";
import { StepperProvider } from "./StepperProvider";
import CheckoutStepContent1 from "./CheckoutStepContent1";
import CheckoutStepContent2 from "./CheckoutStepContent2";
import CheckoutStepContent3 from "./CheckoutStepContent3";

const steps = [
  {
    buttonText: "Select network and token",
    optional: false,
    content: CheckoutStepContent1,
  },
  {
    buttonText: "Wrap",
    optional: true,
    content: CheckoutStepContent2,
  },
  {
    buttonText: "Review the transaction",
    optional: false,
    content: CheckoutStepContent3,
  },
] as const;

export default function CheckoutStepper() {
  return (
    <StepperProvider totalSteps={steps.length}>
      {({ activeStep, setActiveStep, handleNext }) => (
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
