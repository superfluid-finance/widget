import { FC } from "react";
import NetworkAvatar, { NetworkAvatarProps } from "./NetworkAvatar";
import { SxProps, useTheme } from "@mui/material";

const NetworkBadge: FC<NetworkAvatarProps> = ({
  network,
  AvatarProps = {},
}) => (
  <NetworkAvatar
    network={network}
    AvatarProps={{
      ...AvatarProps,
      sx: {
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        fontSize: "1.2rem",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
        ...AvatarProps.sx,
      },
    }}
  />
);

export default NetworkBadge;
