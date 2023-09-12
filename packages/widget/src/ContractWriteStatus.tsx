import CircleIcon_ from "@mui/icons-material/Circle.js";
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  AbiErrorSignatureNotFoundError,
  BaseError,
  ContractFunctionRevertedError,
  decodeErrorResult,
} from "viem";

import { ContractWriteResult } from "./ContractWriteManager.js";
import { superfluidErrorsABI } from "./core/wagmi-generated.js";
import { normalizeIcon } from "./helpers/normalizeIcon.js";

export const CircleIcon = normalizeIcon(CircleIcon_);

const tryParseErrorName = (error: BaseError): string | undefined => {
  try {
    const rootError = error.walk();
    if (rootError instanceof AbiErrorSignatureNotFoundError) {
      return decodeErrorResult({
        abi: superfluidErrorsABI,
        data: rootError.signature,
      }).errorName;
    } else if (rootError instanceof ContractFunctionRevertedError) {
      return rootError.name;
    }
  } catch (e) {
    console.error(e);
  }
};

export function ContractWriteStatus(
  result: ContractWriteResult,
  index: number,
) {
  const {
    contractWrite: { id, displayTitle },
    prepareResult,
    writeResult,
    transactionResult,
    currentError,
  } = result;

  const theme = useTheme();

  const borderColor = currentError
    ? theme.palette.error.main
    : transactionResult.isSuccess
    ? theme.palette.success.main
    : writeResult?.isSuccess
    ? theme.palette.warning.main
    : theme.palette.action.selected;

  const errorName = useMemo(
    () => (currentError ? tryParseErrorName(currentError) : undefined),
    [currentError],
  );

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
          {currentError
            ? errorName || "Something went wrong."
            : transactionResult.isSuccess
            ? "Completed"
            : writeResult?.isSuccess
            ? "In progress"
            : "Not started"}
        </Typography>
      </Stack>
    </Paper>
  );
}
