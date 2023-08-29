import { Avatar, AvatarProps } from "@mui/material";
import {
  defaultNetworkAssets,
  SupportedNetwork,
} from "@superfluid-finance/widget";
import { FC, useMemo } from "react";

export interface NetworkAvatarProps {
  network: SupportedNetwork;
  AvatarProps?: Partial<AvatarProps>;
}

const NetworkAvatar: FC<NetworkAvatarProps> = ({
  network,
  AvatarProps = {},
}) => {
  const networkAssetInfo = useMemo(() => {
    return defaultNetworkAssets[network.id];
  }, [network]);

  const { sx: AvatarSx = {} } = AvatarProps;

  return (
    <Avatar
      data-testid={`${network.id}-badge`}
      src={networkAssetInfo?.logoURI}
      {...AvatarProps}
      sx={{
        // Don't show background color when logo is present because some logos have transparency.
        ...(networkAssetInfo &&
        !networkAssetInfo.logoURI &&
        networkAssetInfo.color
          ? { backgroundColor: networkAssetInfo.color }
          : {}),
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
