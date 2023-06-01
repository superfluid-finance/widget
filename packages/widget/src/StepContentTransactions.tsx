import {
  Alert,
  AlertTitle,
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import ContractWriteButton from "./ContractWriteButton";
import { ContractWriteCircularProgress } from "./ContractWriteCircularProgress";
import { useStepper } from "./StepperContext";
import ArrowBackIcon_ from "@mui/icons-material/ArrowBack";
import { normalizeIcon } from "./helpers/normalizeIcon";
import CloseIcon_ from "@mui/icons-material/Close";
import { ContractWriteStatus } from "./ContractWriteStatus";

const ArrowBackIcon = normalizeIcon(ArrowBackIcon_);
const CloseIcon = normalizeIcon(CloseIcon_);

export function StepContentTransactions() {
  const { handleBack, handleNext } = useStepper();

  const { contractWrites, contractWriteResults, writeIndex } =
    useCommandHandler(); // Cleaner to pass with props.

  if (writeIndex > 0 && writeIndex === contractWriteResults.length) {
    // TODO(KK): Check for success statuses. Maybe if not everything is a success, provide an explicit continue button.
    handleNext(); // i.e. all transactions handled
  }

  const total = contractWrites.length;
  const currentResult = contractWriteResults[writeIndex];

  return (
    <Box>
      <AppBar sx={{ position: "relative" }} color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            aria-label="back"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
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
          <ContractWriteCircularProgress
            thickness={4}
            size={80}
            index={writeIndex}
            total={total}
          />
        </Stack>
        {contractWriteResults.map(ContractWriteStatus)}
        {/* // TODO(KK): We're not currently displaying the error anywhere.
        {currentResult?.relevantError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {currentResult.relevantError.shortMessage}
          </Alert>
        )} */}
        {currentResult && <ContractWriteButton {...currentResult} />}
      </Stack>
    </Box>
  );
}
