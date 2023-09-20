import ReplayIcon_ from "@mui/icons-material/Replay";
import SkipNextIcon_ from "@mui/icons-material/SkipNext";
import WarningAmberIcon_ from "@mui/icons-material/WarningAmber";
import { LoadingButton } from "@mui/lab";
import { Button, Collapse, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";

import { ContractWriteResult } from "./ContractWriteManager.js";
import { runEventListener } from "./EventListeners.js";
import { normalizeIcon } from "./helpers/normalizeIcon.js";
import { useWidget } from "./WidgetContext.js";

const ReplayIcon = normalizeIcon(ReplayIcon_);
const SkipNextIcon = normalizeIcon(SkipNextIcon_);
const WarningAmberIcon = normalizeIcon(WarningAmberIcon_);

export type ContractWriteButtonProps = {
  isLastWrite: boolean;
  handleNextWrite: () => void;
} & ContractWriteResult;

export default function ContractWriteButton({
  isLastWrite,
  handleNextWrite: handleNextWrite_,
  contractWrite,
  prepareResult,
  writeResult,
  transactionResult,
  currentError,
}: ContractWriteButtonProps) {
  const { eventListeners } = useWidget();
  const write = writeResult.write;

  const isLoading =
    prepareResult.isLoading ||
    writeResult.isLoading ||
    transactionResult.isLoading;

  const expectedChainId = contractWrite.chainId;
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const needsToSwitchNetwork = expectedChainId !== chain?.id;

  const onSwitchNetworkButtonClick = useCallback(() => {
    runEventListener(eventListeners.onButtonClick, { type: "switch_network" });
    switchNetwork?.(expectedChainId);
  }, [switchNetwork, expectedChainId, eventListeners.onButtonClick]);

  const onContractWriteButtonClick = useCallback(() => {
    runEventListener(eventListeners.onButtonClick, {
      type: "invoke_transaction",
    });
    write?.();
  }, [write, eventListeners.onButtonClick]);

  const onRetryTransactionButtonClick = useCallback(() => {
    runEventListener(eventListeners.onButtonClick, {
      type: "retry_gas_estimation",
    });
    prepareResult.refetch();
  }, [prepareResult.refetch, eventListeners.onButtonClick]);

  const onForceTransactionButtonClick = useCallback(() => {
    runEventListener(eventListeners.onButtonClick, {
      type: "force_invoke_transaction",
    });
    write!();
  }, [write, eventListeners.onButtonClick]);

  const isPrepareError = Boolean(
    currentError &&
      currentError === prepareResult.error &&
      !prepareResult.isFetching,
  );

  const [allowNextWriteButton, setAllowNextWriteButton] = useState(false);
  const showNextWriteButton =
    (allowNextWriteButton || transactionResult.isError) && !isLastWrite; // Don't show the button for the last contract write. It would be confusing to show the success screen when possibly the last TX fails.

  const onSkipButtonClick = useCallback(() => {
    runEventListener(eventListeners.onButtonClick, {
      type: "skip_to_next",
    });
    handleNextWrite_();
    setAllowNextWriteButton(false);
  }, [handleNextWrite_, eventListeners.onButtonClick]);

  useEffect(() => {
    if (transactionResult.isLoading) {
      const timeoutId = setTimeout(() => {
        setAllowNextWriteButton(true);
      }, 15_000); // After 15 seconds, the button appears.
      return () => clearTimeout(timeoutId);
    } else {
      setAllowNextWriteButton(false);
    }
  }, [transactionResult.isLoading, onSkipButtonClick]);

  const showForceSendButton = Boolean(
    isPrepareError &&
      !prepareResult.isLoading &&
      write &&
      !writeResult.isLoading,
  );

  const isWriteButtonDisabled = Boolean(
    isPrepareError || transactionResult.isSuccess || !write,
  );
  const writeButtonText = transactionResult.isLoading
    ? "Waiting for transaction..."
    : writeResult.isLoading
    ? "Waiting for wallet..."
    : "Send transaction";

  const showRetryButton = Boolean(isPrepareError && !writeResult.isLoading);

  return (
    <Stack direction="column" spacing={1}>
      {needsToSwitchNetwork ? (
        <Button
          data-testid="switch-network-button"
          size="large"
          variant="contained"
          fullWidth
          onClick={onSwitchNetworkButtonClick}
        >
          Switch network
        </Button>
      ) : (
        <>
          {showRetryButton ? (
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={onRetryTransactionButtonClick}
              endIcon={<ReplayIcon />}
            >
              Retry transaction gas estimation
            </Button>
          ) : (
            <LoadingButton
              loadingPosition="end"
              data-testid="transaction-button"
              size="large"
              variant="contained"
              fullWidth
              disabled={isWriteButtonDisabled}
              onClick={onContractWriteButtonClick}
              loading={isLoading}
            >
              {writeButtonText}
            </LoadingButton>
          )}
          <Collapse in={showNextWriteButton} unmountOnExit>
            <Button
              variant="outlined"
              color="primary"
              size="medium"
              endIcon={<SkipNextIcon />}
              fullWidth
              onClick={onSkipButtonClick}
            >
              Skip to next transaction
            </Button>
          </Collapse>
          <Collapse in={showForceSendButton} unmountOnExit>
            <Button
              variant="outlined"
              size="medium"
              color="error"
              startIcon={<WarningAmberIcon />}
              fullWidth
              onClick={onForceTransactionButtonClick}
            >
              Force transaction to be sent
            </Button>
          </Collapse>
        </>
      )}
    </Stack>
  );
}
