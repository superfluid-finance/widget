import { Paper, Stack, Typography } from "@mui/material";
import { WrapIntoSuperTokensCommand } from "../commands";
import { useWidget } from "../WidgetContext";
import { TokenAvatar } from "../TokenAvatar";
import { UpgradeIcon } from "./CommandPreview";

export function WrapIntoSuperTokensPreview({
  command: cmd,
}: {
  command: WrapIntoSuperTokensCommand;
}) {
  const { getSuperToken, getUnderlyingToken } = useWidget();

  const superToken = getSuperToken(cmd.superTokenAddress);
  const underlyingToken = getUnderlyingToken(cmd.underlyingTokenAddress);

  return (
    <Stack direction="column" alignItems="center" spacing={3}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={3}
        width="100%"
      >
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography>You are wrapping</Typography>
          <Stack
            component={Paper}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ px: 3, py: 1 }}
          >
            <TokenAvatar tokenInfo={underlyingToken} />
            <Typography>{cmd.amountEther}</Typography>
            <Typography>{underlyingToken.symbol}</Typography>
          </Stack>
        </Stack>

        <Stack component={Paper} sx={{ p: 1 }}>
          <UpgradeIcon sx={{ transform: "rotate(90deg)" }} />
        </Stack>

        <Stack direction="column" alignItems="center" spacing={1}>
          <Typography>You are receiving</Typography>
          <Stack
            component={Paper}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ px: 3, py: 1 }}
          >
            <TokenAvatar tokenInfo={superToken} />
            <Typography>{cmd.amountEther}</Typography>
            <Typography>{superToken.symbol}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Typography>
        1 {underlyingToken.symbol} = 1 {superToken.symbol}
      </Typography>
    </Stack>
  );
}
