import { createContext, useContext } from "react";

export type StepperContextValue = {
  activeStep: number;
  setActiveStep: (activeStep: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  isLastStep: () => boolean;
  isPenultimateStep: () => boolean;
  totalSteps: number;
};

export const StepperContext = createContext<StepperContextValue | undefined>(undefined);

export const useStepper = (): StepperContextValue => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a StepperProvider");
  }
  return context;
};
