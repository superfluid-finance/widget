import { Divider, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ValidFormValues } from "./formValues";
import { useCommandHandler } from "./CommandHandlerContext";
import { Fragment, useEffect, useMemo, useState } from "react";
import { StepperContinueButton } from "./StepperContinueButton";
import { CommandPreview } from "./previews/CommandPreview";
import { formValuesToCommands } from "./formValuesToCommands";

export default function StepContentReview() {
  const {
    getValues,
    formState: { isValid, isValidating },
  } = useFormContext<ValidFormValues>();

  const { submitCommands } = useCommandHandler();

  // TODO(KK): Consider this logic...
  // In essence, the Review step is given the orchestration control of mapping into commands and setting up a session.
  const commands = useMemo(() => {
    if (!isValid) throw new Error("Form should always be valid at this point.");

    return formValuesToCommands(getValues());
  }, []);

  useEffect(() => submitCommands(commands), [commands]);

  return (
    <Stack sx={{ pb: 3, px: 3.5 }} gap={3}>
      <Stack direction="column" spacing={3}>
        {commands.map((cmd, index) => (
          <Fragment key={cmd.id}>
            {index > 0 && <Divider />}
            <CommandPreview command={cmd} />
          </Fragment>
        ))}
      </Stack>
      <StepperContinueButton disabled={!isValid || isValidating}>
        Continue
      </StepperContinueButton>
    </Stack>
  );
}
