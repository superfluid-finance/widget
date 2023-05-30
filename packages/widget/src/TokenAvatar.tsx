import { Avatar, AvatarProps } from "@mui/material";
import { TokenInfo } from "@superfluid-finance/tokenlist";

type Props = {
  tokenInfo: TokenInfo;
} & AvatarProps;

export function TokenAvatar({ tokenInfo, ...AvatarProps }: Props) {
  return tokenInfo.logoURI ? (
    <Avatar
      alt={`${tokenInfo.symbol} logo`}
      src={tokenInfo.logoURI}
      sx={{ width: 32, height: 32 }}
      {...AvatarProps}
    />
  ) : (
    <Avatar
      alt={`${tokenInfo.symbol} logo`}
      sx={{ width: 32, height: 32 }}
      {...AvatarProps}
    >
      {" "}
    </Avatar>
  );
}
