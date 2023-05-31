import { Avatar } from "@mui/material";
import { FC, useMemo } from "react";
import { SupportedNetwork } from "./core";

interface NetworkAvatarProps {
  network: SupportedNetwork;
}

const networkIconNames = {
  42161: "arbitrum",
  43114: "avalanche",
  56: "binance",
  42220: "celo",
  1: "ethereum",
  100: "gnosis",
  10: "optimism",
  137: "polygon",
};

const NetworkAvatar: FC<NetworkAvatarProps> = ({ network }) => {
  const networkIconUrl = useMemo(() => {
    if (network.testnet) return undefined;

    const iconName = networkIconNames[network.id];
    if (!iconName) return undefined;

    return `https://raw.githubusercontent.com/superfluid-finance/widget/master/apps/widget-builder/public/assets/network-icons/${iconName}.svg`;
  }, [network]);

  return (
    <Avatar
      src={networkIconUrl}
      variant="rounded"
      sx={{ objectFit: "contain" }}
    >
      {network.testnet && network.name.charAt(0)}
    </Avatar>
  );
};

export default NetworkAvatar;
