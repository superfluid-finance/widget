import { LoadingButton } from "@mui/lab";
import { Button, Stack } from "@mui/material";
import { useCallback } from "react";
import {
  ContractFunctionExecutionError,
  ContractFunctionRevertedError,
  ContractFunctionZeroDataError,
} from "viem";
import { useNetwork, useSwitchNetwork } from "wagmi";

import { ContractWriteResult } from "./ContractWriteManager.js";
import { runEventListener } from "./EventListeners.js";
import { useWidget } from "./WidgetContext.js";

export type ContractWriteButtonProps = ContractWriteResult;

export default function ContractWriteButton({
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

  return (
    <Stack direction="column" alignItems="stretch" sx={{ width: "100%" }}>
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
        <LoadingButton
          loadingIndicator="Loading…"
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
          {contractWrite.displayTitle}
        </LoadingButton>
      )}
    </Stack>
  );
}
