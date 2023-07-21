import { Alert, Collapse, Divider, Stack } from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext.js";
import { Fragment } from "react";
import { StepperCTAButton } from "./StepperCTAButton.js";
import { CommandPreview } from "./previews/CommandPreview.js";
import { useStepper } from "./StepperContext.js";
import { useCommandValidationSchema } from "./useCommandValidationSchema.js";
import { useQuery } from "wagmi";

export default function StepContentReview() {
  const { commands, sessionId } = useCommandHandler();

  const { handleNext } = useStepper();

  const commandValidationSchema = useCommandValidationSchema();

  const { isFetching: isValidating, data: validationResult } = useQuery(
    [sessionId],
    async () =>
      await commandValidationSchema.safeParseAsync({
        wrapIntoSuperTokensCommand: commands.find(
          (x) => x.type === "Wrap into Super Tokens",
        ),
        sendStreamCommand: commands.find((x) => x.type === "Send Stream"),
      }),
  );
  const isValid = Boolean(validationResult?.success);
  const isValidationError = validationResult?.success === false;

  return (
    <Stack sx={{ pb: 3, px: 3.5 }} gap={3}>
      <Stack direction="column" spacing={3}>
        <Collapse in={isValidationError}>
          {isValidationError && (
            <Alert severity="error">
              {validationResult.error.issues[0].message}
            </Alert>
          )}
        </Collapse>
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
