import {
  Avatar,
  Chip,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ContractWriteResult } from "./ContractWriteManager";
import CircleIcon_ from "@mui/icons-material/Circle";
import { normalizeIcon } from "./helpers/normalizeIcon";

export const CircleIcon = normalizeIcon(CircleIcon_);

export function ContractWriteStatus(result: ContractWriteResult) {
  const {
    contractWrite: { id, commandId, displayTitle },
    relevantError,
    transactionResult,
    writeResult,
  } = result;

  const theme = useTheme();

  const borderColor = relevantError
    ? theme.palette.error.main
    : transactionResult.isSuccess
    ? theme.palette.success.main
    : writeResult?.isSuccess
    ? theme.palette.warning.main
    : theme.palette.action.selected;

  return (
    <Paper
      variant="outlined"
      key={id}
      sx={{
        py: 1.25,
        px: 2,
        borderColor: borderColor,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography>{displayTitle}</Typography>
        <Chip
          variant="outlined"
          avatar={
            <Avatar sx={{ bgcolor: "transparent" }}>
              <CircleIcon sx={{ color: borderColor, width: 20, height: 20 }} />
            </Avatar>
          }
          label={
            relevantError
              ? "Something went wrong."
              : transactionResult.isSuccess
              ? "Completed"
              : writeResult?.isSuccess
              ? "In progress"
              : "Not started"
          }
          sx={{ border: 0 }}
        />
      </Stack>
    </Paper>
  );
}
