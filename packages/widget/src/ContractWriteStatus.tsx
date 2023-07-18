import CircleIcon_ from "@mui/icons-material/Circle";
import { Paper, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { ContractWriteResult } from "./ContractWriteManager";
import { normalizeIcon } from "./helpers/normalizeIcon";

export const CircleIcon = normalizeIcon(CircleIcon_);

export function ContractWriteStatus(
  result: ContractWriteResult,
  index: number,
) {
  const {
    contractWrite: { id, commandId, displayTitle },
    transactionResult,
    writeResult,
    prepareResult,
    latestError,
  } = result;

  const theme = useTheme();

  const borderColor = latestError
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
        p: 1.5,
        borderColor: borderColor,
        borderRadius: "10px",
      }}
    >
      <Stack direction="row" alignItems="center" gap={0.75}>
        <Typography data-testid="transaction-type" flex={1} variant="body2">{`${
          index + 1
        }. ${displayTitle}`}</Typography>
        <CircleIcon sx={{ color: borderColor, width: 12, height: 12 }} />

        {!latestError && (
          <Typography data-testid="transaction-status" variant="body2">
            {
              // latestError ? "Something went wrong." this is a temporary fix
              transactionResult.isSuccess
                ? "Completed"
                : writeResult?.isSuccess
                ? "In progress"
                : "Not started"
            }
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}
