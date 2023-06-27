import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import superTokenList from "@superfluid-finance/tokenlist";
import { ChainId } from "@superfluid-finance/widget";
import Image from "next/image";
import { FC, ReactNode } from "react";
import { networks } from "../../networkDefinitions";

type PaymentOptionRowProps = {
  label: string;
  value: ReactNode;
};

const PaymentOptionRow: FC<PaymentOptionRowProps> = ({ label, value }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      sx={{ width: "100%", justifyContent: "space-between" }}
    >
      <Typography
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
  flowRate: string;
  receiverAddress: `0x${string}`;
  chainId: ChainId;
  index: number;
  remove: (index: number) => void;
};

const PaymentOptionView: FC<PaymentOptionViewProps> = ({
  superToken,
  flowRate,
  receiverAddress,
  chainId,
  index,
  remove,
}) => {
  const theme = useTheme();
  const network = networks.find((n) => n.chainId === chainId);
  const token = Object.values(superTokenList.tokens).find(
    (token) => token.address === superToken.address
  );
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack direction="column" gap={1} sx={{ mb: 2 }}>
        <PaymentOptionRow
          label="Network"
          value={
            <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
              {network?.logoUrl && (
                <Image src={network.logoUrl} alt="" width={24} height={24} />
              )}
              {network?.name}
            </Stack>
          }
        />
        <PaymentOptionRow
          label="Token"
          value={
            <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
              {token?.logoURI && (
                <Image src={token.logoURI} alt="" width={24} height={24} />
              )}
              {token?.name}
            </Stack>
          }
        />
        <PaymentOptionRow label="Flow Rate" value={flowRate} />
        <PaymentOptionRow
          label="Receiver"
          value={
            <Tooltip title={receiverAddress}>
              <Typography>
                {`${receiverAddress.substring(
                  0,
                  6
                )}...${receiverAddress.substring(
                  receiverAddress.length - 4,
                  receiverAddress.length
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
