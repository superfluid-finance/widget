import { Box, Stack, StepContent, Typography } from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import ContractWriteButton from "./ContractWriteButton";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";

export function StepContentTransactions() {
  const { contractWrites, contractWriteResults, writeIndex } =
    useCommandHandler(); // Cleaner to pass with props.

  const total = contractWrites.length;
  const result = contractWriteResults[writeIndex];

  return (
    <StepContent>
      <Stack
        direction="column"
        alignItems="stretch"
        justifyContent="space-around"
        spacing={3}
      >
        <Box>
          <CircularProgressWithLabel size={100}>
            {total > 1 && (
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >
                {writeIndex + 1}/{total}
              </Typography>
            )}
          </CircularProgressWithLabel>
        </Box>
        {result && <ContractWriteButton {...result} />}
      </Stack>
    </StepContent>
  );
}
