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
  handleNextWrite: () => void;
} & ContractWriteResult;

export default function ContractWriteButton({
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
    switchNetwork?.(expectedChainId);
    runEventListener(eventListeners.onButtonClick, { type: "switch_network" });
  }, [switchNetwork, expectedChainId, eventListeners.onButtonClick]);

  const onContractWriteButtonClick = useCallback(() => {
    write?.();
    runEventListener(eventListeners.onButtonClick, {
      type: "invoke_transaction",
    });
  }, [write, eventListeners.onButtonClick]);

  const [showNextWriteButton_, setShowNextWriteButton] = useState(false);
  const showNextWriteButton = showNextWriteButton_ || transactionResult.isError;

  const handleNextWrite = useCallback(() => {
    handleNextWrite_();
    setShowNextWriteButton(false);
  }, [handleNextWrite_]);

  useEffect(() => {
    if (transactionResult.isLoading) {
      const timeoutId = setTimeout(() => {
        setShowNextWriteButton(true);
      }, 20_000); // After 20 seconds, the button appears.
      return () => clearTimeout(timeoutId);
    } else {
      setShowNextWriteButton(false);
    }
  }, [transactionResult.isLoading, handleNextWrite]);

  const isPrepareError = Boolean(
    currentError && currentError === prepareResult.error,
  );

  const showForceSendButton = Boolean(
    isPrepareError && write && !writeResult.isLoading,
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
              onClick={() => prepareResult.refetch()}
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
          <Collapse in={showForceSendButton} unmountOnExit>
            <Button
              variant="outlined"
              size="medium"
              color="error"
              startIcon={<WarningAmberIcon />}
              fullWidth
              onClick={() => write!()}
            >
              Force transaction to be sent
            </Button>
          </Collapse>
          <Collapse in={showNextWriteButton} unmountOnExit>
            <Button
              variant="outlined"
              color="primary"
              size="medium"
              endIcon={<SkipNextIcon />}
              fullWidth
              onClick={handleNextWrite}
            >
              Skip to next transaction
            </Button>
          </Collapse>
        </>
      )}
    </Stack>
  );
}
