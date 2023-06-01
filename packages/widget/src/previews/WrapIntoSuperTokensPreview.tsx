import { Box, Paper, Stack, Typography } from "@mui/material";
import { TokenAvatar } from "../TokenAvatar";
import { useWidget } from "../WidgetContext";
import { WrapIntoSuperTokensCommand } from "../commands";
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
    <Stack direction="column" alignItems="center" spacing={2.25}>
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          width: "100%",
        }}
        alignItems="center"
        textAlign="center"
        rowGap={1.25}
        columnGap={3}
      >
        <Typography>You are wrapping</Typography>
        <Box />
        <Typography>You are receiving</Typography>

        <Stack
          component={Paper}
          direction="column"
          alignItems="center"
          justifyContent="center"
          flex={1}
          spacing={0.5}
          sx={{ p: 1.5 }}
        >
          <TokenAvatar tokenInfo={underlyingToken} />
          <Typography>{cmd.amountEther}</Typography>
          <Typography>{underlyingToken.symbol}</Typography>
        </Stack>

        <Stack component={Paper} sx={{ p: 1 }}>
          <UpgradeIcon fontSize="small" />
        </Stack>
        <Stack
          component={Paper}
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
          sx={{ p: 1.5 }}
        >
          <TokenAvatar tokenInfo={superToken} />
          <Typography>{cmd.amountEther}</Typography>
          <Typography>{superToken.symbol}</Typography>
        </Stack>
      </Stack>
      <Typography>
        1 {underlyingToken.symbol} = 1 {superToken.symbol}
      </Typography>
    </Stack>
  );
}
