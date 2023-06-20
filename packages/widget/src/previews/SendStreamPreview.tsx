import { Box, Stack, Typography } from "@mui/material";
import { useBalance } from "wagmi";
import { AccountAddressCard } from "../AccountAddressCard";
import StreamIndicator from "../StreamIndicator";
import { useWidget } from "../WidgetContext";
import { SendStreamCommand } from "../commands";
import { CacheKey } from "../helpers/wagmiUtils";

export function SendStreamPreview({
  command: cmd,
}: {
  command: SendStreamCommand;
}) {
  const { getSuperToken } = useWidget();
  const superToken = getSuperToken(cmd.superTokenAddress);

  const { data: tokenBalance } = useBalance({
    token: cmd.superTokenAddress,
    address: cmd.accountAddress,
    chainId: cmd.chainId,
    formatUnits: "ether",
    scopeKey: CacheKey.Balances,
  });

  return (
    <Stack direction="column" alignItems="center" spacing={3} width="100%">
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          rowGap: 1.25,
        }}
        alignItems="center"
        width="100%"
      >
        <Typography variant="caption" fontWeight="medium">
          Sender
        </Typography>
        <Box />
        <Typography variant="caption" fontWeight="medium">
          Receiver
        </Typography>

        <AccountAddressCard
          address={cmd.accountAddress}
          PaperProps={{ sx: { zIndex: 2 } }}
        />
        <StreamIndicator sx={{ mx: -1, zIndex: 0 }} />
        <AccountAddressCard
          address={cmd.receiverAddress}
          PaperProps={{ sx: { zIndex: 2 } }}
        />
      </Stack>

      <Typography variant="caption" fontWeight="medium">
        Balance: {tokenBalance?.formatted} {superToken.symbol}
      </Typography>
    </Stack>
  );
}
