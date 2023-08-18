import { Avatar, AvatarProps } from "@mui/material";
import { FC, useMemo } from "react";

import { defaultNetworkAssets, SupportedNetwork } from "./core/index.js";

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
    return defaultNetworkAssets[network.id];
  }, [network]);

  const { sx: AvatarSx = {} } = AvatarProps;

  return (
    <Avatar
      data-testid={`${network.id}-badge`}
      src={networkAssetConf?.logoURI}
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
