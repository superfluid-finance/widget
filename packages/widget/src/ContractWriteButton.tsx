import { LoadingButton } from "@mui/lab";
import { ContractWriteResult } from "./ContractWriteManager";
import { Button, Stack } from "@mui/material";
import { useChainId, useSwitchNetwork } from "wagmi";

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
  const chainId = useChainId();

  const { switchNetwork } = useSwitchNetwork();
  const needsToSwitchNetwork = expectedChainId !== chainId;

  return (
    <Stack direction="column" alignItems="stretch" sx={{ width: "100%" }}>
      {needsToSwitchNetwork ? (
        <Button
          size="large"
          variant="contained"
          fullWidth
          onClick={() => switchNetwork?.(expectedChainId)}
        >
          Switch Network
        </Button>
      ) : (
        <LoadingButton
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
