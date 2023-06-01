import { Box, Paper, Stack, Typography } from "@mui/material";
import { SendStreamCommand } from "../commands";
import { useWidget } from "../WidgetContext";
import { AccountAddressCard } from "../AccountAddressCard";
import { useBalance } from "wagmi";
import { NorthEastIcon } from "./CommandPreview";
import StreamIndicator from "../StreamIndicator";

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

        <AccountAddressCard address={cmd.accountAddress} />
        <StreamIndicator />
        <AccountAddressCard address={cmd.receiverAddress} />
      </Stack>

      <Typography variant="caption" fontWeight="medium">
        Balance: {tokenBalance?.formatted} {superToken.symbol}
      </Typography>
    </Stack>
  );
}
