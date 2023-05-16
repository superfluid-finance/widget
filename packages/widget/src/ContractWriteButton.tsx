import { Alert, AlertTitle, LoadingButton } from "@mui/lab";
import { ContractWriteResult2 } from "./ContractWriteHandler";
import { Stack } from "@mui/material";
import { BaseError } from "viem";

export type ContractWriteButtonProps = ContractWriteResult2;

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
  const error = (prepareResult.error ||
    writeResult.error ||
    transactionResult.error) as unknown as BaseError; // TODO(KK): move it away from here
  const functionName = contractWrite.functionName;
  const showButton = !transactionResult.isSuccess;

  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="stretch"
      sx={{ width: "100%" }}
    >
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error.shortMessage}
        </Alert>
      )}
      {showButton && (
        <LoadingButton
          variant="contained"
          fullWidth
          disabled={!write}
          onClick={() => write?.()}
          loading={isLoading}
        >
          {functionName}
        </LoadingButton>
      )}
    </Stack>
  );
}
