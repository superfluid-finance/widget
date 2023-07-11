import { Divider, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ValidFormValues } from "./formValues";
import { useCommandHandler } from "./CommandHandlerContext";
import { Fragment } from "react";
import { StepperCTAButton } from "./StepperCTAButton";
import { CommandPreview } from "./previews/CommandPreview";
import { useStepper } from "./StepperContext";

export default function StepContentReview() {
  const {
    formState: { isValid, isValidating },
  } = useFormContext<ValidFormValues>();

  const { commands } = useCommandHandler();

  const { handleNext } = useStepper();

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
      <StepperCTAButton
        disabled={!isValid || isValidating}
        onClick={handleNext}
      >
        Continue
      </StepperCTAButton>
    </Stack>
  );
}
