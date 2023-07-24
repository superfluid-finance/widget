import { LoadingButton } from "@mui/lab";
import { Button, Stack } from "@mui/material";
import { useNetwork, useSwitchNetwork } from "wagmi";

import { ContractWriteResult } from "./ContractWriteManager.js";

export type ContractWriteButtonProps = ContractWriteResult;

export default function ContractWriteButton({
  contractWrite,
  prepareResult,
  writeResult,
  transactionResult,
}: ContractWriteButtonProps) {
  const write = writeResult.write;

  const isLoading =
    prepareResult.isLoading ||
    writeResult.isLoading ||
    transactionResult.isLoading;

  const expectedChainId = contractWrite.chainId;
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const needsToSwitchNetwork = expectedChainId !== chain?.id;

  return (
    <Stack direction="column" alignItems="stretch" sx={{ width: "100%" }}>
      {needsToSwitchNetwork ? (
        <Button
          data-testid="switch-network-button"
          size="large"
          variant="contained"
          fullWidth
          onClick={() => switchNetwork?.(expectedChainId)}
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
          disabled={!write || transactionResult.isSuccess}
          onClick={() => write?.()}
          loading={isLoading}
        >
          {contractWrite.displayTitle}
        </LoadingButton>
      )}
    </Stack>
  );
}
