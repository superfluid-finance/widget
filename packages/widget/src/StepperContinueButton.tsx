import { useFormContext } from "react-hook-form";
import { ValidFormValues } from "./formValues";
import { useStepper } from "./StepperContext";
import { Button, ButtonProps } from "@mui/material";
import { formValuesToCommands } from "./formValuesToCommands";
import { useCommandHandler } from "./CommandHandlerContext";

export function StepperContinueButton(props: ButtonProps) {
  const { handleNext, isPenultimateStep } = useStepper();
  const { handleSubmit } = useFormContext<ValidFormValues>();
  const { setCommands } = useCommandHandler();

  return (
    <Button
      variant="contained"
      onClick={() => {
        if (isPenultimateStep()) {
          handleSubmit((values) => {
            const commands = formValuesToCommands(
              values as ValidFormValues // TODO(KK): This is better in next version of react-hook-form.
            );
            setCommands(commands);
            handleNext();
          })();
        } else {
          handleNext();
        }
      }}
      {...props}
    />
  );
}
