import {
  Box,
  colors,
  ListItemAvatar,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { FC } from "react";
import { useAccount } from "wagmi";

import theme from "../../theme";
import AddressAvatar from "../address-avatar/AddressAvatar";

function shortenHex(address: string, length = 4) {
  return `${address.substring(0, 2 + length)}...${address.substring(
    address.length - length,
    address.length,
  )}`;
}

const DemoWalletDisplay: FC = () => {
  const { address } = useAccount();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  if (!address) {
    return null;
  }

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ListItemAvatar sx={{ mr: 2 }}>
        <AddressAvatar address={address} />
      </ListItemAvatar>
      <ListItemText
        data-cy={"wallet-connection-status"}
        primary={matches ? shortenHex(address) : address}
        secondary={"Connected (Demo Wallet)"}
        primaryTypographyProps={{
          variant: "h6",
          sx: {
            textOverflow: "ellipsis",
            fontWeight: "bold",
            whiteSpace: "pre",
            overflow: "hidden",
          },
        }}
        secondaryTypographyProps={{
          color: colors.green[500],
          fontWeight: "bold",
        }}
      />
    </Box>
  );
};

export default DemoWalletDisplay;
