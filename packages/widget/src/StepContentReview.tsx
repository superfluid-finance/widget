import { Button, Stack, StepContent } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ValidFormValues } from "./formValues";
import { formValuesToCommands } from "./formValuesToCommands";
import { useCommandHandler } from "./CommandHandlerContext";

export default function StepContentReview() {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<ValidFormValues>();
  const { handleCommands } = useCommandHandler();

  return (
    <StepContent>
      <Stack>
        <Button
          disabled={!isValid}
          variant="contained"
          fullWidth
          onClick={handleSubmit((values) => {
            const commands = formValuesToCommands(values);
            handleCommands(commands);
          })}
        >
          Subscribe
        </Button>
      </Stack>
    </StepContent>
  );
}
