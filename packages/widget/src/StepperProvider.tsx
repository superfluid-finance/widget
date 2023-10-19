import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";

import { useCommandHandler } from "./CommandHandlerContext.js";
import { DraftFormValues, ValidFormValues } from "./formValues.js";
import { formValuesToCommands } from "./formValuesToCommands.js";
import { StepperContext, StepperContextValue } from "./StepperContext.js";
import { ChildrenProp } from "./utils.js";
import { useWidget } from "./WidgetContext.js";

type Props = {
  children: (contextValue: StepperContextValue) => ChildrenProp;
  totalSteps: number;
  walletConnectStep: number;
  initialStep?: number;
};

export function StepperProvider({
  children,
  totalSteps,
  walletConnectStep = 0,
  initialStep = 0,
}: Props) {
  const [activeStep, setActiveStep] = useState(initialStep);

  const { handleSubmit } = useFormContext<DraftFormValues, ValidFormValues>();

  const { submitCommands } = useCommandHandler();

  const handleNext = useCallback(
    (currentStep: number) => {
      const isStepBeforeReview = currentStep === totalSteps - 4;
      const nextActiveStep = Math.min(currentStep + 1, totalSteps - 1);

      if (isStepBeforeReview) {
        handleSubmit((formValues) => {
          submitCommands(formValuesToCommands(formValues as ValidFormValues));
          setActiveStep(nextActiveStep);
        })(); // Don't do anything when invalid.
      } else {
        setActiveStep(nextActiveStep);
      }
    },
    [submitCommands, handleSubmit, totalSteps],
  );

  const handleBack = useCallback((currentStep: number) => {
    setActiveStep(Math.max(currentStep - 1, 0));
  }, []);

  const { isConnected } = useAccount();

  const isActiveStepOverWalletConnect = activeStep > walletConnectStep;
  useEffect(() => {
    if (!isConnected && isActiveStepOverWalletConnect) {
      setActiveStep(walletConnectStep);
    }
  }, [walletConnectStep, isConnected]);

  const {
    stepper: { orientation },
  } = useWidget();

  const contextValue = {
    activeStep:
      isConnected || !isActiveStepOverWalletConnect
        ? activeStep
        : walletConnectStep,
    setActiveStep,
    handleNext,
    handleBack,
    totalSteps,
    orientation,
  };

  return (
    <StepperContext.Provider value={contextValue}>
      {children(contextValue)}
    </StepperContext.Provider>
  );
}
