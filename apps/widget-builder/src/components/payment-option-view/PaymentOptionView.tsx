import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChainId,
  FlowRate,
  supportedNetworks,
} from "@superfluid-finance/widget";
import superTokenList from "@superfluid-finance/widget/tokenlist";
import Image from "next/image";
import { FC, ReactNode, useMemo } from "react";

import NetworkAvatar from "../NetworkAvatar";

type PaymentOptionRowProps = {
  label: string;
  value: ReactNode;
};

const PaymentOptionRow: FC<PaymentOptionRowProps> = ({ label, value }) => {
  const theme = useTheme();
  return (
    <Stack
      data-testid={`${label
        .toLowerCase()
        .replaceAll(" ", "-")}-added-payment-option`}
      direction="row"
      sx={{ width: "100%", justifyContent: "space-between" }}
    >
      <Typography
        data-testid="payment-option-label"
        sx={{
          color: theme.palette.grey[700],
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
      {value}
    </Stack>
  );
};

type PaymentOptionViewProps = {
  superToken: { address: `0x${string}` };
  upfrontPaymentAmountEther?: string;
  flowRate: FlowRate;
  receiverAddress: `0x${string}`;
  chainId: ChainId;
  index: number;
  remove: (index: number) => void;
};

const PaymentOptionView: FC<PaymentOptionViewProps> = ({
  superToken,
  upfrontPaymentAmountEther,
  flowRate,
  receiverAddress,
  chainId,
  index,
  remove,
}) => {
  const theme = useTheme();
  const network = supportedNetworks.find((n) => n.id === chainId)!;
  const token = Object.values(superTokenList.tokens).find(
    (token) => token.address === superToken.address,
  );

  const flowRateValue = useMemo(() => {
    if (!flowRate) return "Custom amount";
    return `${flowRate.amountEther} ${token?.symbol}/${flowRate.period}`;
  }, [flowRate, token]);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack direction="column" gap={1} sx={{ mb: 2 }}>
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
            value={`${upfrontPaymentAmountEther} ${token?.symbol}`}
          />
        )}
        <PaymentOptionRow
          label="Receiver"
          value={
            <Tooltip
              title={receiverAddress}
              data-testid="added-payment-receiver-tooltip"
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
            </Tooltip>
          }
        />
      </Stack>

      <Stack
        direction="row"
        sx={{ width: "100%", justifyContent: "center" }}
        gap={1}
      >
        {/* <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{
            width: "160px",
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
            boxShadow: "none",
            textTransform: "none",

            "&:hover:enabled": {
              color: theme.palette.common.white,
            },
          }}
        >
          Edit
          <EditIcon sx={{ fontSize: 16, ml: 1 }} />
        </Button> */}
        <Button
          data-testid="delete-payment-option-button"
          fullWidth
          color="error"
          sx={{
            color: theme.palette.error.main,
            backgroundColor: theme.palette.error.light,
            boxShadow: "none",
            textTransform: "none",
            "&:hover:enabled": {
              color: theme.palette.common.white,
            },
          }}
          variant="contained"
          onClick={() => remove(index)}
        >
          Delete
          <CloseIcon sx={{ fontSize: 16, ml: 1 }} />
        </Button>
      </Stack>
    </Paper>
  );
};

export default PaymentOptionView;
