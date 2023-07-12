import { Orientation } from "@mui/material";
import { createContext, useContext } from "react";

export type StepperContextValue = {
  activeStep: number;
  totalSteps: number;
  setActiveStep: (activeStep: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  orientation: Orientation;
};

export const StepperContext = createContext<StepperContextValue | undefined>(
  undefined,
);

export const useStepper = (): StepperContextValue => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a StepperProvider");
  }
  return context;
};
