import {
  useState,
  useCallback,
  PropsWithChildren,
} from "react";
import { StepperContext, StepperContextValue } from "./StepperContext";

type Props = {
  children: (
    contextValue: StepperContextValue
  ) => PropsWithChildren["children"];
  totalSteps: number;
};

export function StepperProvider({ children, totalSteps }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = useCallback(() => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, totalSteps - 1));
  }, [totalSteps]);

  const handleBack = useCallback(() => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  }, []);

  const isLastStep = useCallback(() => {
    return activeStep === totalSteps - 1;
  }, [activeStep, totalSteps]);

  const contextValue = {
    activeStep,
    setActiveStep,
    handleNext,
    handleBack,
    isLastStep,
    totalSteps,
  };

  return (
    <StepperContext.Provider value={contextValue}>
      {children(contextValue)}
    </StepperContext.Provider>
  );
}
