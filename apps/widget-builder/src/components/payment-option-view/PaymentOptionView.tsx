import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
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
import superTokenList from "@superfluid-finance/widget/tokenlist";
import Image from "next/image";
import { FC, ReactNode, useMemo } from "react";
import { getAddress } from "viem";

import NetworkAvatar from "../NetworkAvatar";

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
  const theme = useTheme();
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
  remove: (index: number) => void;
};

const PaymentOptionView: FC<PaymentOptionViewProps> = ({
  superToken,
  upfrontPaymentAmountEther,
  flowRate,
  receiverAddress: receiverAddress_,
  chainId,
  index,
  remove,
}) => {
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
      Object.values(superTokenList.tokens).find(
        (token) =>
          token.address.toLowerCase() === superToken.address.toLowerCase(),
      ),
    [superTokenList, superToken.address],
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
      <Divider />
      <Stack
        component={CardActions}
        direction="row"
        justifyContent="flex-end"
        bgcolor="grey.50"
      >
        <Button
          data-testid="delete-payment-option-button"
          color="error"
          variant="text"
          onClick={() => remove(index)}
        >
          Remove
        </Button>
      </Stack>
    </Card>
  );
};

export default PaymentOptionView;
