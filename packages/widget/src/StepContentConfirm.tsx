import {
  Alert,
  AlertTitle,
  AppBar,
  Box,
  Chip,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import ContractWriteButton from "./ContractWriteButton";
import { ContractWriteCircularProgress } from "./ContractWriteCircularProgress";
import { BaseError } from "viem";
import { useStepper } from "./StepperContext";
import ArrowBackIcon_ from "@mui/icons-material/ArrowBack";
import { normalizeIcon } from "./helpers/normalizeIcon";

const ArrowBackIcon = normalizeIcon(ArrowBackIcon_);

export function StepContentTransactions() {
  const { handleBack, handleNext } = useStepper();

  const { contractWrites, contractWriteResults, writeIndex } =
    useCommandHandler(); // Cleaner to pass with props.

  if (writeIndex > 0 && writeIndex === contractWriteResults.length) {
    // TODO(KK): Check for success statuses. Maybe if not everything is a success, provide an explicit continue button.
    handleNext(); // i.e. all transactions handled
  }

  const total = contractWrites.length;
  const result = contractWriteResults[writeIndex];

  // TODO(KK): Could solve the case cleaner where writeIndex goes out of bounds.
  const error =
    result &&
    ((result.prepareResult.error ||
      result.writeResult.error ||
      result.transactionResult.error) as unknown as BaseError);

  return (
    <Box>
      <AppBar sx={{ position: "relative" }} color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack
        direction="column"
        spacing={2}
        alignItems="stretch"
        sx={{ width: "100%" }}
      >
        <Stack direction="column" alignItems="center">
          <Typography variant="h5" component="span">
            You're almost there!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Send the transactions from your wallet to finish your purchase.
          </Typography>
        </Stack>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-around"
        >
          {total > 1 && (
            <ContractWriteCircularProgress
              size={100}
              index={writeIndex}
              total={total}
            />
          )}
        </Stack>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.shortMessage}
          </Alert>
        )}
        {result && <ContractWriteButton {...result} />}
      </Stack>
    </Box>
  );
}
