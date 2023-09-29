import { Alert, Collapse, Divider, Stack } from "@mui/material";
import { Fragment, useCallback, useEffect } from "react";
import { useQuery } from "wagmi";

import { useCommandHandler } from "./CommandHandlerContext.js";
import { runEventListener } from "./EventListeners.js";
import { CommandPreview } from "./previews/CommandPreview.js";
import { StepProps } from "./Stepper.js";
import { useStepper } from "./StepperContext.js";
import { StepperCTAButton } from "./StepperCTAButton.js";
import { useCommandValidationSchema } from "./useCommandValidationSchema.js";
import { useWidget } from "./WidgetContext.js";

export default function StepContentReview({ stepIndex }: StepProps) {
  const { commands, contractWrites, sessionId } = useCommandHandler();

  const { handleNext } = useStepper();

  const { eventListeners } = useWidget();

  useEffect(() => {
    runEventListener(eventListeners.onRouteChange, { route: "step_review" });
  }, [eventListeners.onRouteChange]);

  const onContinue = useCallback(() => {
    runEventListener(eventListeners.onButtonClick, { type: "next_step" });
    handleNext(stepIndex);
  }, [handleNext, eventListeners.onButtonClick, stepIndex]);

  const commandValidationSchema = useCommandValidationSchema();

  const { isFetching: isValidating, data: validationResult } = useQuery(
    [sessionId],
    async () =>
      await commandValidationSchema.safeParseAsync({
        wrapIntoSuperTokensCommand: commands.find(
          (x) => x.type === "Wrap into Super Tokens",
        ),
        subscribeCommand: commands.find((x) => x.type === "Subscribe"),
      }),
  );

  const areContractWritesMapping = !commands.every((x) => x.contractWrites);

  const isValidationError = validationResult?.success === false;
  const isValid = !isValidationError;

  const validationMessage = isValidationError
    ? validationResult.error.issues[0].message
    : "";

  return (
    <Stack sx={{ pb: 3, px: 3.5 }} spacing={3}>
      <Stack direction="column" spacing={3}>
        {commands.map((cmd, index) => (
          <Fragment key={cmd.id}>
            {index > 0 && <Divider />}
            <CommandPreview command={cmd} />
          </Fragment>
        ))}
      </Stack>
      <Stack direction="column" spacing={1}>
        <Collapse in={isValidationError} unmountOnExit>
          <Alert variant="standard" data-testid="review-error" severity="error">
            {validationMessage}
          </Alert>
        </Collapse>
        <StepperCTAButton
          loadingPosition="end"
          loading={isValidating || areContractWritesMapping}
          disabled={!isValid}
          onClick={onContinue}
        >
          {isValidating
            ? "Validating..."
            : areContractWritesMapping
            ? "Preparing transactions..."
            : "Continue"}
        </StepperCTAButton>
      </Stack>
    </Stack>
  );
}
