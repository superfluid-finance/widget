import { Avatar, AvatarProps } from "@mui/material";
import { memo } from "react";
import Blockies from "react-blockies";

interface BlockiesProps {
  size?: number;
  scale?: number;
}

interface AddressAvatarProps {
  address: string;
  AvatarProps?: AvatarProps;
  BlockiesProps?: BlockiesProps;
}

interface RainbowKitAvatarComponentProps {
  address: string;
  ensImage?: string | null;
  size?: number;
}

export default memo(function AddressAvatar({
  address,
  AvatarProps = {},
  BlockiesProps = { size: 12, scale: 3 },
}: AddressAvatarProps & RainbowKitAvatarComponentProps) {
  return (
    <Avatar alt="generated blockie avatar" variant="rounded" {...AvatarProps}>
      {/* Read about the Blockies API here: https://github.com/stephensprinkle-zz/react-blockies */}
      <Blockies seed={address.toLowerCase()} {...BlockiesProps} />
    </Avatar>
  );
});
