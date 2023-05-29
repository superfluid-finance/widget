import { Stack } from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import ContractWriteButton from "./ContractWriteButton";
import { TransactionCircularProgress } from "./TransactionCircularProgress";

export function StepContentTransactions() {
  const { contractWrites, contractWriteResults, writeIndex } =
    useCommandHandler(); // Cleaner to pass with props.

  const total = contractWrites.length;
  const result = contractWriteResults[writeIndex];

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-around"
      spacing={3}
    >
      <TransactionCircularProgress
        size={100}
        index={writeIndex}
        total={total}
      />
      {result && <ContractWriteButton {...result} />}
    </Stack>
  );
}
