import CloseIcon_ from "@mui/icons-material/Close.js";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";

import { useCommandHandler } from "./CommandHandlerContext.js";
import { BatchHandler } from "./CommandHandlerProvider.js";
import ContractWriteButton from "./ContractWriteButton.js";
import { ContractWriteCircularProgress } from "./ContractWriteCircularProgress.js";
import { ContractWriteStatus } from "./ContractWriteStatus.js";
import { runEventListener } from "./EventListeners.js";
import { normalizeIcon } from "./helpers/normalizeIcon.js";
import { StepProps } from "./Stepper.js";
import { useStepper } from "./StepperContext.js";
import { useWidget } from "./WidgetContext.js";

const CloseIcon = normalizeIcon(CloseIcon_);

export function StepContentTransactions({ stepIndex }: StepProps) {
  const { handleBack, handleNext, setActiveStep, totalSteps } = useStepper();

  const {
    contractWrites,
    contractWriteResults,
    writeIndex,
    handleNextWrite: handleNextWrite_,
  } = useCommandHandler(); // Cleaner to pass with props.

  const { eventListeners } = useWidget();

  useEffect(() => {
    runEventListener(eventListeners.onRouteChange, { route: "transactions" });
  }, [eventListeners.onRouteChange]);

  useEffect(() => {
    if (writeIndex > 0 && writeIndex === contractWriteResults.length) {
      // TODO(KK): Check for success statuses. Maybe if not everything is a success, provide an explicit continue button.
      setActiveStep(totalSteps - 1); // i.e. all transactions handled
    }
  }, [writeIndex, contractWriteResults, handleNext, totalSteps, setActiveStep]);

  const onBack = useCallback(() => {
    handleBack(stepIndex);
    runEventListener(eventListeners.onButtonClick, {
      type: "back_transactions",
    });
  }, [handleBack, eventListeners.onButtonClick, stepIndex]);

  const total = contractWrites.length;
  const currentResult = contractWriteResults[writeIndex];

  const handleNextWrite = useCallback(
    () => handleNextWrite_(writeIndex),
    [handleNextWrite_, writeIndex],
  );

  return (
    <Box>
      <Stack alignItems="end">
        <IconButton
          edge="start"
          color="inherit"
          onClick={onBack}
          aria-label="back"
          sx={{ mr: -1 }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <BatchHandler />
      <Stack
        direction="column"
        gap={2.25}
        alignItems="stretch"
        sx={{ width: "100%" }}
      >
        <Box textAlign="center">
          <Typography variant="h5" component="span">
            {`You're almost there!`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Send the transactions from your wallet to finish your purchase.
          </Typography>
        </Box>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-around"
        >
          <ContractWriteCircularProgress
            thickness={4}
            size={80}
            index={writeIndex}
            total={total}
          />
        </Stack>
        <Stack gap={1}>
          {contractWriteResults.map((result, index) => (
            <ContractWriteStatus
              key={index.toString()}
              result={result}
              index={index}
            />
          ))}
        </Stack>
        {currentResult && (
          <ContractWriteButton
            {...currentResult}
            handleNextWrite={handleNextWrite}
          />
        )}
      </Stack>
    </Box>
  );
}
