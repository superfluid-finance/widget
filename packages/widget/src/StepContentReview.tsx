import { Alert, Collapse, Divider, Stack } from "@mui/material";
import { Fragment, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useCommandHandler } from "./CommandHandlerContext.js";
import { CommandPreview } from "./previews/CommandPreview.js";
import { StepProps } from "./Stepper.js";
import { useStepper } from "./StepperContext.js";
import { StepperCTAButton } from "./StepperCTAButton.js";
import { useCommandValidationSchema } from "./useCommandValidationSchema.js";
import { useWidget } from "./WidgetContext.js";

export default function StepContentReview({ stepIndex }: StepProps) {
  const { commands, contractWrites, sessionId } = useCommandHandler();

  const { handleNext } = useStepper();

  const { eventHandlers } = useWidget();

  useEffect(() => {
    eventHandlers.onRouteChange({ route: "step_review" });
  }, [eventHandlers.onRouteChange]);

  const onContinue = useCallback(() => {
    eventHandlers.onButtonClick({ type: "next_step" });
    handleNext(stepIndex);
  }, [handleNext, eventHandlers.onButtonClick, stepIndex]);

  const commandValidationSchema = useCommandValidationSchema();

  const { isFetching: isValidating, data: validationResult } = useQuery({
    queryKey: [sessionId],
    queryFn: async () =>
      await commandValidationSchema.safeParseAsync({
        wrapIntoSuperTokensCommand: commands.find(
          (x) => x.type === "Wrap into Super Tokens",
        ),
        subscribeCommand: commands.find((x) => x.type === "Subscribe"),
      }),
  });

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
