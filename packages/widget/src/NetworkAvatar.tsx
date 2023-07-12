import { Avatar, AvatarProps } from "@mui/material";
import { FC, useMemo } from "react";
import { SupportedNetwork } from "./core";

// TODO: (MÕ) Merge this conf with supported networks
export const networkAssetsConf = [
  {
    name: "Goerli",
    chainId: 5,
    color: "#9064ff",
  },
  {
    name: "Polygon Mumbai",
    chainId: 80001,
    color: "#3099f2",
  },
  {
    name: "Optimism Goerli",
    chainId: 420,
    color: "#ff0320",
  },
  {
    name: "Arbitrum Goerli",
    chainId: 421613,
    color: "#2b374b",
  },
  {
    name: "Avalanche Fuji",
    chainId: 43113,
    color: "#2b374b",
  },
  {
    name: "Gnosis Chain",
    chainId: 100,
    logoUrl: `https://raw.githubusercontent.com/superfluid-finance/widget/master/apps/widget-builder/public/assets/network-icons/gnosis.svg`,
    color: "#04795b",
  },
  {
    name: "Polygon",
    chainId: 137,
    logoUrl: `https://raw.githubusercontent.com/superfluid-finance/widget/master/apps/widget-builder/public/assets/network-icons/polygon.svg`,
    color: "#7c3fe4",
  },
  {
    name: "Optimism",
    chainId: 10,
    logoUrl: `https://raw.githubusercontent.com/superfluid-finance/widget/master/apps/widget-builder/public/assets/network-icons/optimism.svg`,
    color: "#ff0320",
  },
  {
    name: "Arbitrum One",
    chainId: 42161,
    logoUrl: `https://raw.githubusercontent.com/superfluid-finance/widget/master/apps/widget-builder/public/assets/network-icons/arbitrum.svg`,
    color: "#2b374b",
  },
  {
    name: "Avalanche C",
    chainId: 43114,
    logoUrl: `https://raw.githubusercontent.com/superfluid-finance/widget/master/apps/widget-builder/public/assets/network-icons/avalanche.svg`,
    color: "#e84142",
  },
  {
    name: "BNB Smart Chain",
    chainId: 56,
    logoUrl: `https://raw.githubusercontent.com/superfluid-finance/widget/master/apps/widget-builder/public/assets/network-icons/bnb.svg`,
    color: "#F0B90B",
  },
  {
    name: "Ethereum",
    chainId: 1,
    logoUrl: `https://raw.githubusercontent.com/superfluid-finance/widget/master/apps/widget-builder/public/assets/network-icons/ethereum.svg`,
    color: "#627EEA",
  },
  {
    name: "Celo",
    chainId: 42220,
    logoUrl: `https://raw.githubusercontent.com/superfluid-finance/widget/master/apps/widget-builder/public/assets/network-icons/celo.svg`,
    color: "#FCFF52",
  },
];

export interface NetworkAvatarProps {
  network: SupportedNetwork;
  useNetworkBackgroundColor?: boolean;
  AvatarProps?: Partial<AvatarProps>;
}

const NetworkAvatar: FC<NetworkAvatarProps> = ({
  network,
  AvatarProps = {},
}) => {
  const networkAssetConf = useMemo(() => {
    return networkAssetsConf.find((conf) => conf.chainId === network.id);
  }, [network]);

  const { sx: AvatarSx = {} } = AvatarProps;

  return (
    <Avatar
      data-testid={`${network.id}-badge`}
      src={networkAssetConf?.logoUrl}
      {...AvatarProps}
      sx={{
        backgroundColor: networkAssetConf?.color,
        width: 24,
        height: 24,
        fontSize: 16,
        ...AvatarSx,
      }}
    >
      {network.testnet && network.name.charAt(0)}
    </Avatar>
  );
};

export default NetworkAvatar;
