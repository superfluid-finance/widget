import ReplayIcon_ from "@mui/icons-material/Replay";
import SkipNextIcon_ from "@mui/icons-material/SkipNext";
import { LoadingButton } from "@mui/lab";
import { Alert, Button, Collapse, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  BaseError,
  ContractFunctionExecutionError,
  ContractFunctionRevertedError,
  ContractFunctionZeroDataError,
} from "viem";
import { useNetwork, useSwitchNetwork } from "wagmi";

import { ContractWriteResult } from "./ContractWriteManager.js";
import { runEventListener } from "./EventListeners.js";
import { normalizeIcon } from "./helpers/normalizeIcon.js";
import { useWidget } from "./WidgetContext.js";

const ReplayIcon = normalizeIcon(ReplayIcon_);
const SkipNextIcon = normalizeIcon(SkipNextIcon_);

export type ContractWriteButtonProps = {
  handleNextWrite: () => void;
} & ContractWriteResult;

export default function ContractWriteButton({
  handleNextWrite: handleNextWrite_,
  contractWrite,
  prepareResult,
  writeResult,
  transactionResult,
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

  const isSeriousPrepareError =
    prepareResult.isError &&
    (prepareResult.error instanceof ContractFunctionExecutionError ||
      prepareResult.error instanceof ContractFunctionRevertedError ||
      prepareResult.error instanceof ContractFunctionZeroDataError);

  const [showNextWriteButton, setShowNextWriteButton] = useState(false);

  const handleNextWrite = useCallback(() => {
    handleNextWrite_();
    setShowNextWriteButton(false);
  }, [handleNextWrite_]);

  useEffect(() => {
    if (transactionResult.isLoading) {
      const timeoutId = setTimeout(() => {
        setShowNextWriteButton(true);
      }, 5000);
      return () => clearTimeout(timeoutId);
    } else {
      setShowNextWriteButton(false);
    }
  }, [transactionResult.isLoading, handleNextWrite]);

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      gap={1}
      sx={{ width: "100%" }}
    >
      {needsToSwitchNetwork ? (
        <Button
          data-testid="switch-network-button"
          size="large"
          variant="contained"
          fullWidth
          onClick={onSwitchNetworkButtonClick}
        >
          Switch Network
        </Button>
      ) : (
        <>
          <Collapse in={isSeriousPrepareError}>
            <Alert severity="error">
              {(prepareResult.error as BaseError)?.shortMessage}
            </Alert>
          </Collapse>
          {isSeriousPrepareError ? (
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => prepareResult?.refetch()}
              endIcon={<ReplayIcon />}
            >
              Transaction preparation failed. Retry?
            </Button>
          ) : (
            <LoadingButton
              loadingIndicator={
                transactionResult.isLoading
                  ? "Waiting for transaction..."
                  : writeResult.isLoading
                  ? "Waiting for wallet..."
                  : "Loading..."
              }
              data-testid="transaction-button"
              size="large"
              variant="contained"
              fullWidth
              disabled={
                !write || transactionResult.isSuccess || isSeriousPrepareError
              }
              onClick={onContractWriteButtonClick}
              loading={isLoading}
            >
              Send Transaction
              {/* {contractWrite.displayTitle} */}
            </LoadingButton>
          )}
          <Collapse in={showNextWriteButton}>
            <Button
              variant="text"
              size="large"
              fullWidth
              onClick={handleNextWrite}
              endIcon={<SkipNextIcon />}
            >
              Transaction is taking a long time. Skip waiting?
            </Button>
          </Collapse>
        </>
      )}
    </Stack>
  );
}
