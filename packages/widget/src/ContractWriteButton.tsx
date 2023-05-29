import { LoadingButton } from "@mui/lab";
import { ContractWriteResult } from "./ContractWriteHandler";
import { Alert, AlertTitle, Button, Stack } from "@mui/material";
import { BaseError } from "viem";

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
  const error = (prepareResult.error ||
    writeResult.error ||
    transactionResult.error) as unknown as BaseError; // TODO(KK): move it away from here
  const functionName = contractWrite.functionName;

  if (transactionResult.isSuccess) return <Button disabled fullWidth variant="contained" >Success!</Button>;

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
      <LoadingButton
        size="large"
        variant="contained"
        fullWidth
        disabled={!write}
        onClick={() => write?.()}
        loading={isLoading}
      >
        Confirm ({functionName})
      </LoadingButton>
    </Stack>
  );
}
