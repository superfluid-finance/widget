import { useFormContext } from "react-hook-form";
import { ValidFormValues } from "./formValues";
import { useStepper } from "./StepperContext";
import { Button, ButtonProps } from "@mui/material";
import { formValuesToCommands } from "./formValuesToCommands";
import { useCommandHandler } from "./CommandHandlerContext";

export function StepperContinueButton(props: ButtonProps) {
  const { handleNext, activeStep, totalSteps } = useStepper();
  const { handleSubmit } = useFormContext<ValidFormValues>();
  const { submitCommands } = useCommandHandler();

  return (
    <Button
      variant="contained"
      onClick={() => {
        const isStepBeforeReview = activeStep === totalSteps - 3;
        if (isStepBeforeReview) {
          handleSubmit((values) => {
            const commands = formValuesToCommands(
              values as ValidFormValues // TODO(KK): This is better in next version of react-hook-form.
            );
            submitCommands(commands);
            handleNext();
            // TODO(KK): reset? isDirty check?
          })();
        } else {
          handleNext();
        }
      }}
      {...props}
    />
  );
}
