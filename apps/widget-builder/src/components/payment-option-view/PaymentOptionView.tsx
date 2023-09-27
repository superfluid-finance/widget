import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChainId,
  FlowRate,
  supportedNetworks,
} from "@superfluid-finance/widget";
import Image from "next/image";
import { FC, ReactNode, useMemo } from "react";
import { getAddress } from "viem";

import NetworkAvatar from "../NetworkAvatar";
import { widgetBuilderTokenList } from "../widget-preview/WidgetPreview";

type PaymentOptionRowProps = {
  label: string;
  value: ReactNode;
};

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
  },
});

const PaymentOptionRow: FC<PaymentOptionRowProps> = ({ label, value }) => {
  return (
    <Stack
      data-testid={`${label
        .toLowerCase()
        .replaceAll(" ", "-")}-added-payment-option`}
      direction="row"
      sx={{ width: "100%", justifyContent: "space-between" }}
    >
      <Typography data-testid="payment-option-label" fontWeight="500">
        {label}
      </Typography>
      {value}
    </Stack>
  );
};

type PaymentOptionViewProps = {
  superToken: { address: `0x${string}` };
  upfrontPaymentAmountEther?: string;
  flowRate: FlowRate | undefined;
  receiverAddress: `0x${string}`;
  chainId: ChainId;
  index: number;
  clone: (index: number) => void;
  edit: (index: number) => void;
  remove: (index: number) => void;
};

const PaymentOptionView: FC<PaymentOptionViewProps> = ({
  superToken,
  upfrontPaymentAmountEther,
  flowRate,
  receiverAddress: receiverAddress_,
  chainId,
  index,
  clone,
  edit,
  remove,
}) => {
  const theme = useTheme();
  const network = useMemo(
    () => supportedNetworks.find((n) => n.id === chainId)!,
    [chainId],
  );
  const receiverAddress = useMemo(
    () => getAddress(receiverAddress_),
    [receiverAddress_],
  );

  const token = useMemo(
    () =>
      Object.values(widgetBuilderTokenList.tokens).find(
        (token) =>
          token.address.toLowerCase() === superToken.address.toLowerCase(),
      ),
    [widgetBuilderTokenList, superToken.address],
  );

  const flowRateValue = useMemo(() => {
    if (!flowRate) return "User-defined";
    return `${flowRate.amountEther} ${token?.symbol ?? "x"}/${flowRate.period}`;
  }, [flowRate, token]);

  return (
    <Card variant="elevation" elevation={1}>
      <CardContent>
        <Stack direction="column" gap={1}>
          <PaymentOptionRow
            label="Network"
            value={
              <Stack
                data-testid="added-network-option"
                direction="row"
                gap={1}
                sx={{ alignItems: "center" }}
              >
                <NetworkAvatar network={network} />
                {network?.name}
              </Stack>
            }
          />
          <PaymentOptionRow
            label="Token"
            value={
              <Stack
                data-testid="added-token-option"
                direction="row"
                gap={1}
                sx={{ alignItems: "center" }}
              >
                {token?.logoURI && (
                  <Image
                    src={token.logoURI}
                    alt=""
                    width={24}
                    height={24}
                    objectFit="contain"
                  />
                )}
                {token?.name}
              </Stack>
            }
          />
          <PaymentOptionRow label="Stream Rate" value={flowRateValue} />
          {upfrontPaymentAmountEther && (
            <PaymentOptionRow
              label="Upfront Payment Amount"
              value={`${upfrontPaymentAmountEther} ${token?.symbol ?? ""}`}
            />
          )}
          <PaymentOptionRow
            label="Receiver"
            value={
              <NoMaxWidthTooltip
                title={receiverAddress}
                data-testid="added-payment-receiver-tooltip"
                placement="bottom"
                arrow
                PopperProps={{
                  sx: {
                    maxWidth: "none",
                  },
                }}
              >
                <Typography data-testid="added-payment-receiver">
                  {`${receiverAddress.substring(
                    0,
                    6,
                  )}...${receiverAddress.substring(
                    receiverAddress.length - 4,
                    receiverAddress.length,
                  )}
                `}
                </Typography>
              </NoMaxWidthTooltip>
            }
          />
        </Stack>
      </CardContent>
      <Stack
        component={CardActions}
        direction="row"
        justifyContent="flex-end"
        bgcolor="grey.50"
      >
        <Tooltip title="Edit payment option" arrow>
          <IconButton
            data-testid="edit-payment-option-button"
            onClick={() => edit(index)}
            sx={{
              "&:hover .MuiSvgIcon-root": {
                color: theme.palette.primary.main,
              },
            }}
          >
            <EditIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Copy payment option" arrow>
          <IconButton
            data-testid="clone-payment-option-button"
            onClick={() => clone(index)}
            sx={{
              "&:hover .MuiSvgIcon-root": {
                color: theme.palette.secondary.main,
              },
            }}
          >
            <FileCopyIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete payment option" arrow>
          <IconButton
            data-testid="delete-payment-option-button"
            onClick={() => remove(index)}
            sx={{
              "&:hover .MuiSvgIcon-root": {
                color: theme.palette.error.main,
              },
            }}
          >
            <DeleteIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Card>
  );
};

export default PaymentOptionView;
