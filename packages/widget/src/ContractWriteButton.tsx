import ReplayIcon_ from "@mui/icons-material/Replay.js";
import SkipNextIcon_ from "@mui/icons-material/SkipNext.js";
import WarningAmberIcon_ from "@mui/icons-material/WarningAmber.js";
import { LoadingButton } from "@mui/lab";
import { Button, Collapse, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";

import { ContractWriteResult } from "./ContractWriteManager.js";
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
  const { eventHandlers } = useWidget();
  const write = writeResult.write;

  const isLoading =
    prepareResult.isLoading ||
    writeResult.isPending || // TODO?
    transactionResult.isLoading;

  const expectedChainId = contractWrite.chainId;
  const { chain } = useAccount();
  const { switchChain: switchNetwork } = useSwitchChain();
  const { connector } = useAccount();
  const needsToSwitchNetwork = expectedChainId !== chain?.id;

  const onSwitchNetworkButtonClick = useCallback(() => {
    eventHandlers.onButtonClick({ type: "switch_network" });
    switchNetwork?.({ chainId: expectedChainId });
  }, [switchNetwork, expectedChainId, eventHandlers.onButtonClick]);

  const onContractWriteButtonClick = useCallback(() => {
    eventHandlers.onButtonClick({
      type: "invoke_transaction",
    });
    // write?.();
    write(); // TODO
  }, [write, eventHandlers.onButtonClick]);

  const onRetryTransactionButtonClick = useCallback(() => {
    eventHandlers.onButtonClick({
      type: "retry_gas_estimation",
    });
    prepareResult.refetch();
  }, [prepareResult.refetch, eventHandlers.onButtonClick]);

  const onForceTransactionButtonClick = useCallback(() => {
    eventHandlers.onButtonClick({
      type: "force_invoke_transaction",
    });
    write!();
  }, [write, eventHandlers.onButtonClick]);

  const isPrepareError = Boolean(
    currentError &&
      currentError === prepareResult.error &&
      !prepareResult.isFetching,
  );

  const [allowNextWriteButton, setAllowNextWriteButton] = useState(false);
  const showNextWriteButton =
    (allowNextWriteButton || transactionResult.isError) &&
    (!isLastWrite || connector?.id === "safe"); // Don't show the button for the last contract write, unless Gnosis Safe. It would be confusing to show the success screen when possibly the last TX fails.

  const onSkipButtonClick = useCallback(() => {
    eventHandlers.onButtonClick({
      type: "skip_to_next",
    });
    handleNextWrite_();
    setAllowNextWriteButton(false);
  }, [handleNextWrite_, eventHandlers.onButtonClick]);

  useEffect(() => {
    if (transactionResult.isLoading) {
      const timeoutId = setTimeout(() => {
        setAllowNextWriteButton(true);
      }, 30_000); // After 30 seconds, the button appears as an escape hatch.
      return () => clearTimeout(timeoutId);
    } else {
      setAllowNextWriteButton(false);
    }
  }, [transactionResult.isLoading, onSkipButtonClick]);

  const showForceSendButton = Boolean(
    isPrepareError &&
      !prepareResult.isLoading &&
      // write && TODO
      !writeResult.isPending, // TODO
  );

  const isWriteButtonDisabled = Boolean(
    isPrepareError || transactionResult.isSuccess || !write,
  );
  const writeButtonText = transactionResult.isLoading
    ? "Waiting for transaction..."
    : writeResult.isPending // TODO
      ? "Waiting for wallet..."
      : "Send transaction";

  const showRetryButton = Boolean(isPrepareError && !writeResult.isPending); // TODO

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
