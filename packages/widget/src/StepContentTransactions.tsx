import CloseIcon_ from "@mui/icons-material/Close.js";
import {
  Alert,
  Box,
  Collapse,
  IconButton,
  List,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect } from "react";

import { useCommandHandler } from "./CommandHandlerContext.js";
import ContractWriteButton from "./ContractWriteButton.js";
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
  }, [writeIndex, contractWriteResults, handleNext, totalSteps]);

  const onBack = useCallback(() => {
    runEventListener(eventListeners.onButtonClick, {
      type: "back_transactions",
    });
    handleBack(stepIndex);
  }, [handleBack, eventListeners.onButtonClick, stepIndex]);

  const total = contractWrites.length;
  const currentResult = contractWriteResults[Math.min(writeIndex, total - 1)];

  const handleNextWrite = useCallback(
    () => handleNextWrite_(writeIndex),
    [handleNextWrite_, writeIndex],
  );

  const showErrorAlert = Boolean(
    currentResult &&
      currentResult.currentError &&
      currentResult.currentError.shortMessage,
  );

  return (
    <Stack>
      <Stack alignItems="end">
        <IconButton
          edge="start"
          size="medium"
          onClick={onBack}
          aria-label="back"
          sx={(theme) => ({ color: theme.palette.text.secondary, mr: -1 })}
        >
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Stack>
      <Stack
        direction="column"
        spacing={2.25}
        alignItems="stretch"
        sx={{ width: "100%", mt: -1 }}
      >
        <Box textAlign="center">
          <Typography variant="h5" component="span">
            {`You're almost there!`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Send the transactions from your wallet to finish your purchase.
          </Typography>
        </Box>
        {/* <Stack
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
        </Stack> */}
        <List
          disablePadding
          dense
          subheader={
            <ListSubheader
              data-testid="transaction-count"
              sx={{ bgcolor: "transparent" }}
            >
              Transactions ({total})
            </ListSubheader>
          }
        >
          {contractWriteResults.map((result, index) => (
            <ContractWriteStatus
              key={index.toString()}
              result={result}
              index={index}
            />
          ))}
        </List>
        <Collapse in={showErrorAlert} unmountOnExit>
          <Alert severity="error">
            {currentResult.currentError?.shortMessage}
          </Alert>
        </Collapse>
        {currentResult && (
          <ContractWriteButton
            {...currentResult}
            handleNextWrite={handleNextWrite}
          />
        )}
      </Stack>
    </Stack>
  );
}
