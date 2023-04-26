import { Box } from "@mui/material";
import { ReactNode } from "react";
import FormStep from "./FormStep";
import FormStepOne from "./FormStepOne";

type Step = {
  title: string;
  content: ReactNode;
};

const steps: Step[] = [
  {
    title: "Choose network and token",
    content: <FormStepOne />,
  },
  {
    title: "Wrap",
    content: <div>Wrap</div>,
  },
  {
    title: "Review the transaction",
    content: <div>Review the transaction</div>,
  },
];

export default function FormStepper() {
  return (
    <Box>
      {steps.map((step) => (
        <FormStep key={step.title} title={step.title}>
          {step.content}
        </FormStep>
      ))}
    </Box>
  );
}
