import { Box, Stack, Typography } from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import ContractWriteButton from "./ContractWriteButton";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";

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
      <Box>
        <CircularProgressWithLabel size={100}>
          <Typography variant="caption" component="div" color="text.secondary">
            {writeIndex + 1}/{total}
          </Typography>
        </CircularProgressWithLabel>
      </Box>
      {result && <ContractWriteButton {...result} />}
    </Stack>
  );
}
