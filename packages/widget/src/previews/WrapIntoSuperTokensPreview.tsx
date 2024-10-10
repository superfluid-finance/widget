import ArrowForwardRoundedIcon_ from "@mui/icons-material/ArrowForwardRounded.js";
import { Box, Paper, Stack, Typography } from "@mui/material";

import { WrapIntoSuperTokensCommand } from "../commands.js";
import { normalizeIcon } from "../helpers/normalizeIcon.js";
import { TokenAvatar } from "../TokenAvatar.js";
import { useWidget } from "../WidgetContext.js";

export const UpgradeIcon = normalizeIcon(ArrowForwardRoundedIcon_);

export function WrapIntoSuperTokensPreview({
  command: cmd,
}: {
  command: WrapIntoSuperTokensCommand;
}) {
  const { getSuperToken, getUnderlyingToken, getNativeAsset } = useWidget();

  const superToken = getSuperToken(cmd.chainId, cmd.superTokenAddress);
  const underlyingToken = cmd.underlyingToken.isNativeAsset
    ? getNativeAsset(cmd.chainId)
    : getUnderlyingToken(cmd.chainId, cmd.underlyingToken.address);

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
          data-testid="review-underlying-wrap-component"
          component={Paper}
          direction="column"
          alignItems="center"
          justifyContent="center"
          flex={1}
          sx={{ p: 1.5, borderRadius: 0.75 }}
        >
          <TokenAvatar
            data-testid="review-underlying-icon"
            tokenInfo={underlyingToken}
          />
          <Typography
            data-testid="review-underlying-wrap-amount"
            variant="body1"
            sx={{ mt: 0.5 }}
          >
            {cmd.amountInUnits}
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
          data-testid="review-super-wrap-component"
          component={Paper}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 1.5, borderRadius: 0.75 }}
        >
          <TokenAvatar data-testid="review-super-icon" tokenInfo={superToken} />
          <Typography
            data-testid="review-super-wrap-amount"
            variant="body1"
            sx={{ mt: 0.5 }}
          >
            {cmd.amountInUnits}
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
