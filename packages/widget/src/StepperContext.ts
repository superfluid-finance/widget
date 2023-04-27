import { createContext, useContext } from "react";

export type StepperContextValue = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  handleBack: () => void;
  isLastStep: () => boolean;
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
