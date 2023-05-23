import { Stack } from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import ContractWriteButton from "./ContractWriteButton";
import { TransactionCircularProgress } from "./TransactionCircularProgress";

export function Transactions() {
  const { contractWrites, contractWriteResults, writeIndex } =
    useCommandHandler(); // Cleaner to pass with props.

  const total = contractWrites.length;
  const result = contractWriteResults[writeIndex];

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="space-around"
      spacing={3}
    >
      <Stack direction="row" alignItems="center">
        <TransactionCircularProgress
          size={100}
          total={total}
          index={writeIndex}
        />
      </Stack>
      {result && <ContractWriteButton {...result} />}
    </Stack>
  );
}
