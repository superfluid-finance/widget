import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ValidFormValues } from "./formValues";
import { useCommandHandler } from "./CommandHandlerContext";
import { useMemo, useState } from "react";
import { StepperContinueButton } from "./StepperContinueButton";
import { CommandPreview } from "./previews/CommandPreview";
import { formValuesToCommands } from "./formValuesToCommands";

export default function StepContentReview() {
  const {
    getValues,
    formState: { isValid, isValidating },
  } = useFormContext<ValidFormValues>();

  const { commands: commandAggregates, submitCommands } = useCommandHandler();

  const [initialized, setInitialized] = useState(false);

  // TODO(KK): Consider this logic...
  if (!initialized) {
    if (!isValid) 
      throw new Error("Form should always be valid at this point.");

    submitCommands(formValuesToCommands(getValues()));
    setInitialized(true);
  }

  const commands = useMemo(
    () =>
      commandAggregates.map((x) => {
        const { contractWrites, ...command } = x;
        return command;
      }),
    [commandAggregates]
  );

  return (
    <Stack>
      <Stack direction="column" spacing={3}>
        {commands.map((cmd) => (
          <CommandPreview key={cmd.id} command={cmd} />
        ))}
      </Stack>
      <StepperContinueButton disabled={!isValid || isValidating}>
        Continue
      </StepperContinueButton>
    </Stack>
  );
}
