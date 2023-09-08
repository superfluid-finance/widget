import { Alert, Collapse, Divider, Stack } from "@mui/material";
import { Fragment, useCallback, useEffect } from "react";
import { useQuery } from "wagmi";

import { useCommandHandler } from "./CommandHandlerContext.js";
import { runEventListener } from "./EventListeners.js";
import { CommandPreview } from "./previews/CommandPreview.js";
import { useStepper } from "./StepperContext.js";
import { StepperCTAButton } from "./StepperCTAButton.js";
import { useCommandValidationSchema } from "./useCommandValidationSchema.js";
import { useWidget } from "./WidgetContext.js";

export default function StepContentReview() {
  const { commands, sessionId } = useCommandHandler();

  const { handleNext } = useStepper();

  const { eventListeners } = useWidget();

  useEffect(() => {
    runEventListener(eventListeners.onRouteChange, { route: "step_review" });
  }, [eventListeners.onRouteChange]);

  const onContinue = useCallback(() => {
    handleNext();
    runEventListener(eventListeners.onButtonClick, { type: "next_step" });
  }, [handleNext, eventListeners.onButtonClick]);

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
  const isValid = Boolean(validationResult?.success);
  const isValidationError = validationResult?.success === false;

  return (
    <Stack sx={{ pb: 3, px: 3.5 }} gap={3}>
      <Stack direction="column" spacing={3}>
        <Collapse in={isValidationError}>
          {isValidationError && (
            <Alert data-testid="review-error" severity="error">
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
        onClick={onContinue}
      >
        Continue
      </StepperCTAButton>
    </Stack>
  );
}
