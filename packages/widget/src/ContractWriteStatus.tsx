import CircleIcon_ from "@mui/icons-material/Circle.js";
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";

import { ContractWriteResult } from "./ContractWriteManager.js";
import { normalizeIcon } from "./helpers/normalizeIcon.js";

export const CircleIcon = normalizeIcon(CircleIcon_);

export function ContractWriteStatus(
  result: ContractWriteResult,
  index: number,
) {
  const {
    contractWrite,
    signatureResult,
    contractWrite: { id, displayTitle },
    transactionResult,
    writeResult,
    latestError,
  } = result;

  const theme = useTheme();

  useEffect(() => {
    if (latestError) {
      console.error(latestError);
    }
  }, [latestError]);

  const borderColor = // latestError
    // ? theme.palette.error.main
    //:  temporary fix, don't show this for now
    transactionResult.isSuccess
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

        <Typography data-testid="transaction-status" variant="body2">
          {
            // latestError ? "Something went wrong." this is a temporary fix
            transactionResult.isSuccess
              ? "Completed"
              : writeResult?.isSuccess
              ? "In progress"
              : contractWrite.signatureRequest && !signatureResult.data
              ? "Needs signature"
              : "Not started"
          }
        </Typography>
      </Stack>
    </Paper>
  );
}
