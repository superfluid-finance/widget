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
        rowGap={1.5}
        columnGap={4}
      >
        <Typography variant="caption" fontWeight="medium">
          You are wrapping
        </Typography>
        <Box />
        <Typography variant="caption" fontWeight="medium">
          You are receiving
        </Typography>

        <Stack
          component={Paper}
          direction="column"
          alignItems="center"
          justifyContent="center"
          flex={1}
          sx={{ p: 1.5, borderRadius: 0.75 }}
        >
          <TokenAvatar tokenInfo={underlyingToken} />
          <Typography
            data-testid="review-underlying-wrap-amount"
            variant="body1"
            sx={{ mt: 0.5 }}
          >
            {cmd.amountEther}
          </Typography>
          <Typography
            data-testid="review-underlying-token-symbol"
            variant="caption"
          >
            {underlyingToken.symbol}
          </Typography>
        </Stack>

        <Stack component={Paper} sx={{ p: 1 }}>
          <UpgradeIcon fontSize="small" />
        </Stack>

        <Stack
          component={Paper}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 1.5, borderRadius: 0.75 }}
        >
          <TokenAvatar tokenInfo={superToken} />
          <Typography
            data-testid="review-super-wrap-amount"
            variant="body1"
            sx={{ mt: 0.5 }}
          >
            {cmd.amountEther}
          </Typography>
          <Typography data-testid="review-super-token-symbol" variant="caption">
            {superToken.symbol}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        data-testid="exchange-rate"
        variant="caption"
        fontWeight="medium"
      >
        1 {underlyingToken.symbol} = 1 {superToken.symbol}
      </Typography>
    </Stack>
  );
}
