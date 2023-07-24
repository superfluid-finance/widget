import { Box, colors, ListItemAvatar, ListItemText } from "@mui/material";
import { FC } from "react";
import { useAccount } from "wagmi";

import AddressAvatar from "../address-avatar/AddressAvatar";

const DemoWalletDisplay: FC = () => {
  const { address } = useAccount();

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
        primary={address}
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
