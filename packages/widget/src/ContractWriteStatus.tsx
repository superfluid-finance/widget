import CircleIcon_ from "@mui/icons-material/Circle";
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import { ContractWriteResult } from "./ContractWriteManager";
import { normalizeIcon } from "./helpers/normalizeIcon";

export const CircleIcon = normalizeIcon(CircleIcon_);

export function ContractWriteStatus(
  result: ContractWriteResult,
  index: number
) {
  const {
    contractWrite: { id, commandId, displayTitle },
    transactionResult,
    writeResult,
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
        p: 1.25,
        borderColor: borderColor,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="body2">{`${
          index + 1
        }. ${displayTitle}`}</Typography>
        <Stack direction="row" gap={0.75}>
          <CircleIcon sx={{ color: borderColor, width: 20, height: 20 }} />
          <Typography variant="body2">
            {latestError
              ? "Something went wrong."
              : transactionResult.isSuccess
              ? "Completed"
              : writeResult?.isSuccess
              ? "In progress"
              : "Not started"}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
