import { Avatar, AvatarProps } from "@mui/material";
import { TokenInfo } from "@superfluid-finance/tokenlist";

type Props = {
  tokenInfo: TokenInfo;
} & AvatarProps;

export function TokenAvatar({ tokenInfo, ...AvatarProps }: Props) {
  const { sx: AvatarSx = {} } = AvatarProps || {};

  return tokenInfo.logoURI ? (
    <Avatar
      alt={`${tokenInfo.symbol} logo`}
      src={tokenInfo.logoURI}
      {...AvatarProps}
      sx={{ width: 24, height: 24, ...AvatarSx }}
    />
  ) : (
    <Avatar
      alt={`${tokenInfo.symbol} logo`}
      {...AvatarProps}
      sx={{ width: 24, height: 24, ...AvatarSx }}
    >
      {" "}
    </Avatar>
  );
}
