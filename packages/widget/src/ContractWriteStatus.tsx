import CircleIcon_ from "@mui/icons-material/Circle.js";
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  AbiErrorSignatureNotFoundError,
  BaseError,
  ContractFunctionRevertedError,
  decodeErrorResult,
} from "viem";

import { useCommandHandler } from "./CommandHandlerContext.js";
import { ContractWriteResult } from "./ContractWriteManager.js";
import { errorsABI } from "./core/wagmi-generated.js";
import { normalizeIcon } from "./helpers/normalizeIcon.js";

export const CircleIcon = normalizeIcon(CircleIcon_);

export function ContractWriteStatus({
  result,
  index,
}: {
  result: ContractWriteResult;
  index: number;
}) {
  const { writeIndex } = useCommandHandler();

  const {
    contractWrite,
    signatureResult,
    contractWrite: { id, displayTitle },
    prepareResult,
    writeResult,
    transactionResult,
    currentError,
  } = result;

  const theme = useTheme();

  const colors: {
    border: string;
    bullet: string;
    text: string;
  } = currentError
    ? {
        border: theme.palette.error.main,
        bullet: theme.palette.error.main,
        text: theme.palette.error.main,
      }
    : transactionResult.isSuccess
    ? {
        border: theme.palette.success.main,
        bullet: theme.palette.success.main,
        text: theme.palette.success.main,
      }
    : writeResult?.isSuccess
    ? {
        border:
          index === writeIndex
            ? theme.palette.action.active
            : theme.palette.action.selected,
        bullet: theme.palette.warning.main,
        text: theme.palette.warning.main,
      }
    : {
        border:
          index === writeIndex
            ? theme.palette.action.active
            : theme.palette.action.selected,
        bullet: theme.palette.text.secondary,
        text: theme.palette.text.secondary,
      };

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
        borderColor: colors.border,
        borderRadius: "10px",
      }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography data-testid="transaction-type" flex={1} variant="body2">
          {`${index + 1}. ${displayTitle}`}
        </Typography>
        <Typography
          data-testid="transaction-status"
          variant="body2"
          color={colors.text}
        >
          {transactionResult.isError
            ? "Transaction failed"
            : currentError
            ? "Error"
            : transactionResult.isSuccess
            ? "Completed"
            : writeResult?.isSuccess
            ? "Transaction sent"
            : prepareResult.isLoading
            ? "Preparing..."
            : prepareResult.isSuccess
            ? "Ready"
            : contractWrite.signatureRequest && !signatureResult.data
            ? "Needs signature"
            : "Queued"}
        </Typography>
        <CircleIcon sx={{ color: colors.bullet, width: 12, height: 12 }} />
      </Stack>
    </Paper>
  );
}

const tryParseErrorName = (error: BaseError): string | undefined => {
  try {
    const rootError = error.walk();
    if (rootError instanceof AbiErrorSignatureNotFoundError) {
      return decodeErrorResult({
        abi: errorsABI,
        data: rootError.signature,
      }).errorName;
    } else if (rootError instanceof ContractFunctionRevertedError) {
      return rootError.name;
    }
  } catch (e) {
    console.error(e);
  }
};
