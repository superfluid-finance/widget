import { Paper, Stack, Typography } from "@mui/material";
import { SendStreamCommand } from "../commands";
import { useWidget } from "../WidgetContext";
import { AccountAddressCard } from "../AccountAddressCard";
import { useBalance } from "wagmi";
import { NorthEastIcon } from "./CommandPreview";


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
    formatUnits: "ether"
  });

  return (
    <Stack direction="column" alignItems="center" spacing={3} width="100%">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={3}
        width="100%"
      >
        <Stack>
          <Typography>Sender</Typography>
          <AccountAddressCard address={cmd.accountAddress} />
        </Stack>
        <Stack component={Paper} sx={{ p: 1 }}>
          <NorthEastIcon />
        </Stack>
        <Stack>
          <Typography>Receiver</Typography>
          <AccountAddressCard address={cmd.receiverAddress} />
        </Stack>
      </Stack>
      <Typography>Balance: {tokenBalance?.formatted} {superToken.symbol}</Typography>
    </Stack>
  );
}
