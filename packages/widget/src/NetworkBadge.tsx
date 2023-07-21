import { FC } from "react";
import NetworkAvatar, { NetworkAvatarProps } from "./NetworkAvatar.js";

const NetworkBadge: FC<NetworkAvatarProps> = ({
  network,
  AvatarProps = {},
}) => (
  <NetworkAvatar
    network={network}
    AvatarProps={{
      ...AvatarProps,
      sx: {
        // TODO(KK): why pixels?
        width: "32px",
        height: "32px",
        borderRadius: 0.4,
        fontSize: "1.2rem",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
        objectFit: "contain", // TODO(KK): why?
        ...AvatarProps.sx,
      },
    }}
  />
);

export default NetworkBadge;
