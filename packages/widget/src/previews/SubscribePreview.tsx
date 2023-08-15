import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useBalance } from "wagmi";

import { AccountAddressCard } from "../AccountAddressCard.js";
import { SubscribeCommand } from "../commands.js";
import StreamIndicator from "../StreamIndicator.js";
import { useWidget } from "../WidgetContext.js";

export function SubscribePreview({
  command: cmd,
}: {
  command: SubscribeCommand;
}) {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  const { getSuperToken } = useWidget();
  const superToken = getSuperToken(cmd.superTokenAddress);

  const { data: tokenBalance } = useBalance({
    token: cmd.superTokenAddress,
    address: cmd.accountAddress,
    chainId: cmd.chainId,
    formatUnits: "ether",
  });

  return (
    <Stack direction="column" alignItems="center" spacing={3} width="100%">
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          rowGap: 1.25,
          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "1fr",
          },
        }}
        alignItems="center"
        width="100%"
      >
        <Typography variant="caption" fontWeight="medium">
          Sender
        </Typography>
        {!isBelowMd && <Box />}
        <Typography
          variant="caption"
          fontWeight="medium"
          sx={{
            [theme.breakpoints.down("md")]: {
              gridRow: 4,
            },
          }}
        >
          Receiver
        </Typography>

        <AccountAddressCard
          dataTest="sender"
          address={cmd.accountAddress}
          PaperProps={{ sx: { zIndex: 2 } }}
        />
        <StreamIndicator
          sx={{
            mx: -1,
            zIndex: 0,
            [theme.breakpoints.down("md")]: {
              transform: "rotate(90deg)",
              justifySelf: "center",
              transformOrigin: "center",
              mb: -3.5,
            },
          }}
        />
        <AccountAddressCard
          dataTest="receiver"
          address={cmd.receiverAddress}
          PaperProps={{ sx: { zIndex: 2 } }}
        />
      </Stack>

      <Typography
        data-testid="review-supertoken-balance-and-symbol"
        variant="caption"
        fontWeight="medium"
      >
        Balance: {tokenBalance?.formatted} {superToken.symbol}
      </Typography>
    </Stack>
  );
}
