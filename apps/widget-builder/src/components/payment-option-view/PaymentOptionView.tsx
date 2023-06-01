import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { ChainId } from "@superfluid-finance/widget";
import { FC, ReactNode } from "react";
import { networks } from "../../networkDefinitions";
import superTokenList from "@superfluid-finance/tokenlist";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

type PaymentOptionRowProps = {
  label: string;
  value: string | ReactNode;
};
const PaymentOptionRow: FC<PaymentOptionRowProps> = ({ label, value }) => (
  <Stack
    direction="row"
    sx={{ width: "100%", justifyContent: "space-between" }}
  >
    <Typography>{label}</Typography>
    <Typography>{value}</Typography>
  </Stack>
);

type PaymentOptionViewProps = {
  superToken: { address: `0x${string}` };
  flowRate: string;
  receiverAddress: `0x${string}`;
  chainId: ChainId;
  index: number;
  isDefault?: boolean;
  remove: (index: number) => void;
};

const PaymentOptionView: FC<PaymentOptionViewProps> = ({
  superToken,
  flowRate,
  receiverAddress,
  chainId,
  index,
  isDefault = false,
  remove,
}) => {
  const theme = useTheme();
  const network = networks.find((n) => n.chainId === chainId);
  const token = Object.values(superTokenList.tokens).find(
    (token) => token.address === superToken.address
  );
  return (
    <Stack
      direction="column"
      sx={{
        ...(isDefault
          ? {
              border: `1.5px solid ${theme.palette.primary.main}`,
            }
          : {
              border: `1.5px solid ${theme.palette.grey[300]}`,
            }),

        borderRadius: 4,
        p: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack direction="column" gap={1} sx={{ width: "100%", mb: 2 }}>
        <PaymentOptionRow label="Network" value={network?.name} />
        <PaymentOptionRow label="Token" value={token?.name} />
        <PaymentOptionRow label="Flow Rate" value={flowRate} />
        <PaymentOptionRow
          label="Receiver"
          value={`${receiverAddress.substring(
            0,
            6
          )}...${receiverAddress.substring(
            receiverAddress.length - 4,
            receiverAddress.length
          )}`}
        />
      </Stack>

      <Stack
        direction="row"
        sx={{ width: "100%", justifyContent: "center" }}
        gap={1}
      >
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{
            width: "160px",
            color: "theme.palette.primary.main",
            backgroundColor: theme.palette.primary.light,
            boxShadow: "none",
            textTransform: "none",
          }}
        >
          Edit
          <EditIcon sx={{ fontSize: 16, ml: 1 }} />
        </Button>
        <Button
          color="error"
          sx={{
            width: "160px",
            color: theme.palette.error.main,
            backgroundColor: theme.palette.error.light,
            boxShadow: "none",
            textTransform: "none",
          }}
          variant="contained"
          onClick={() => remove(index)}
        >
          Delete
          <CloseIcon sx={{ fontSize: 16, ml: 1 }} />
        </Button>
      </Stack>
    </Stack>
  );
};

export default PaymentOptionView;
