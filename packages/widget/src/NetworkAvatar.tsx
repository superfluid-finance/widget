import { Avatar } from "@mui/material";
import { FC } from "react";
import { SupportedNetwork } from "./core";

interface NetworkAvatarProps {
  network: SupportedNetwork;
}

const NetworkAvatar: FC<NetworkAvatarProps> = ({ network }) => {
  // TODO: (MÕ) Add network icons
  return <Avatar sx={{}}>{network.name.charAt(0)}</Avatar>;
};

export default NetworkAvatar;
