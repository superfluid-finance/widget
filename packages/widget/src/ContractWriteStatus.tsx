import CheckIcon_ from "@mui/icons-material/Check";
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
import { useCallback, useMemo } from "react";
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
import { runEventListener } from "./EventListeners.js";
import { normalizeIcon } from "./helpers/normalizeIcon.js";
import { useWidget } from "./WidgetContext.js";

export const CircleIcon = normalizeIcon(CircleIcon_);
export const CircleOutlinedIcon = normalizeIcon(CircleOutlinedIcon_);
export const OpenInNewIcon = normalizeIcon(OpenInNewIcon_);
export const CheckCircleIcon = normalizeIcon(CheckIcon_);

export function ContractWriteStatus({
  result,
  index,
}: {
  result: ContractWriteResult;
  index: number;
}) {
  const { writeIndex } = useCommandHandler();
  const { eventListeners } = useWidget();

  const onViewOnBlockExplorerButtonClick = useCallback(() => {
    runEventListener(eventListeners.onButtonClick, {
      type: "view_transaction_on_block_explorer",
    });
  }, [eventListeners.onButtonClick]);

  const {
    contractWrite: { displayTitle },
    prepareResult,
    writeResult,
    transactionResult,
  } = result;

  const { palette } = useTheme();
  const isWriting = index === writeIndex;

  const status = transactionResult.isSuccess
    ? { text: "Completed", iconColor: palette.success.dark }
    : transactionResult.isError
    ? { text: "Failed", iconColor: palette.error.main }
    : prepareResult.isLoading && !prepareResult.isSuccess
    ? { text: "Estimating transaction...", iconColor: palette.warning.main }
    : prepareResult.isError
    ? { text: "Estimation error", iconColor: palette.error.main }
    : writeResult.isSuccess
    ? { text: "Transaction sent", iconColor: palette.warning.main }
    : writeResult.isError
    ? { text: "Error", iconColor: palette.error.main }
    : prepareResult.isSuccess
    ? { text: "Ready to send", iconColor: palette.success.main }
    : { text: "Queued", iconColor: palette.action.disabled };

  const { chains } = useNetwork();

  const chain = useMemo(
    () => chains.find((x) => x.id === result.contractWrite.chainId)!,
    [chains, result.contractWrite.chainId],
  );

  return (
    <Paper
      data-testid="transaction-type-and-status"
      component={ListItem}
      variant="outlined"
      sx={{
        bgcolor: isWriting ? palette.action.hover : palette.background.paper,
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
            onClick={onViewOnBlockExplorerButtonClick}
          >
            <OpenInNewIcon fontSize="inherit" />
          </IconButton>
        )
      }
    >
      <ListItemIcon
        data-testid="transaction-status-icon"
        sx={{ justifyContent: "center" }}
      >
        {transactionResult.isSuccess ? (
          <CheckCircleIcon fontSize="medium" sx={{ color: status.iconColor }} />
        ) : (
          <CircleIcon fontSize="small" sx={{ color: status.iconColor }} />
        )}
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ fontWeight: isWriting ? 500 : 400 }}
        secondaryTypographyProps={{ fontWeight: isWriting ? 500 : 400 }}
        primary={displayTitle}
        secondary={status.text}
      />
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
