import CheckCircleIcon_ from "@mui/icons-material/CheckCircle";
import CircleIcon_ from "@mui/icons-material/Circle.js";
import CircleOutlinedIcon_ from "@mui/icons-material/CircleOutlined";
import OpenInNewIcon_ from "@mui/icons-material/OpenInNew";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import {
  AbiErrorSignatureNotFoundError,
  BaseError,
  ContractFunctionRevertedError,
  decodeErrorResult,
} from "viem";
import { useNetwork } from "wagmi";

import { useCommandHandler } from "./CommandHandlerContext.js";
import { ContractWriteResult } from "./ContractWriteManager.js";
import { errorsABI } from "./core/wagmi-generated.js";
import { normalizeIcon } from "./helpers/normalizeIcon.js";

export const CircleIcon = normalizeIcon(CircleIcon_);
export const CircleOutlinedIcon = normalizeIcon(CircleOutlinedIcon_);
export const OpenInNewIcon = normalizeIcon(OpenInNewIcon_);
export const CheckCircleIcon = normalizeIcon(CheckCircleIcon_);

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

  const isWriting = index === writeIndex;

  // TODO(KK): clean-up
  const colors: {
    border: string;
    bullet: string;
    text: string;
  } = currentError
    ? {
        border: isWriting
          ? theme.palette.action.selected
          : theme.palette.error.main,
        bullet: theme.palette.error.main,
        text: theme.palette.error.main,
      }
    : transactionResult.isSuccess
    ? {
        border: isWriting
          ? theme.palette.action.active
          : theme.palette.primary.main,
        bullet: theme.palette.success.dark,
        text: theme.palette.success.main,
      }
    : writeResult?.isSuccess
    ? {
        border: isWriting
          ? theme.palette.action.selected
          : theme.palette.action.active,
        bullet: theme.palette.warning.main,
        text: theme.palette.text.secondary,
      }
    : prepareResult.isLoading
    ? {
        border: isWriting
          ? theme.palette.action.selected
          : theme.palette.action.active,
        bullet: theme.palette.warning.main,
        text: theme.palette.text.secondary,
      }
    : {
        border: isWriting
          ? theme.palette.action.selected
          : theme.palette.action.active,
        bullet: isWriting
          ? theme.palette.primary.light
          : theme.palette.action.disabled,
        text: theme.palette.text.secondary,
      };

  const errorName = useMemo(
    () => (currentError ? tryParseErrorName(currentError) : undefined),
    [currentError],
  );

  const { chains } = useNetwork();

  const chain = useMemo(
    () => chains.find((x) => x.id === result.contractWrite.chainId)!,
    [chains, result.contractWrite.chainId],
  );

  return (
    <Paper
      component={ListItem}
      variant="outlined"
      sx={{
        bgcolor: isWriting
          ? theme.palette.action.hover
          : theme.palette.background.paper,
        pl: 0,
        "&:not(:last-child)": {
          mb: 1,
        },
      }}
      secondaryAction={
        writeResult?.data?.hash &&
        chain.blockExplorers?.default && (
          <IconButton
            href={
              chain.blockExplorers.default.url + "/tx/" + writeResult.data.hash
            }
            target="_blank"
            size="small"
            title="View on blockchain explorer"
          >
            <OpenInNewIcon fontSize="inherit" />
          </IconButton>
        )
      }
    >
      <ListItemIcon sx={{ justifyContent: "center" }}>
        {transactionResult.isSuccess ? (
          <CheckCircleIcon fontSize="small" sx={{ color: colors.bullet }} />
        ) : (
          <CircleIcon fontSize="small" sx={{ color: colors.bullet }} />
        )}
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ fontWeight: isWriting ? 500 : 400 }}
        secondaryTypographyProps={{ fontWeight: isWriting ? 500 : 400 }}
        primary={displayTitle}
        secondary={
          transactionResult.isError
            ? "Failed"
            : transactionResult.isSuccess
            ? "Completed"
            : prepareResult.isLoading
            ? "Estimating..."
            : currentError
            ? "Error"
            : writeResult?.isSuccess
            ? "Transaction sent"
            : contractWrite.signatureRequest && !signatureResult.data
            ? "Needs signature"
            : prepareResult.isSuccess
            ? "Ready to send"
            : "Queued"
        }
      ></ListItemText>
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
