import { Paper, Stack, Typography } from "@mui/material";
import {
  Command,
  EnableAutoWrapCommand,
  SendStreamCommand,
  WrapIntoSuperTokensCommand,
} from "../commands";
import UpgradeIcon_ from "@mui/icons-material/Upgrade";
import { normalizeIcon } from "../helpers/normalizeIcon";
import { useWidget } from "../WidgetContext";
import { TokenAvatar } from "../TokenAvatar";
import { AccountAddressCard } from "../AccountAddressCard";
import NorthEastIcon_ from "@mui/icons-material/NorthEast";
import { useBalance } from "wagmi";

const NorthEastIcon = normalizeIcon(NorthEastIcon_);
const UpgradeIcon = normalizeIcon(UpgradeIcon_);

export function CommandPreview({ command: cmd }: { command: Command }) {
  switch (cmd.type) {
    case "Wrap into Super Tokens":
      return <WrapIntoSuperTokensPreview command={cmd} />;
    case "Enable Auto-Wrap":
      return <EnableAutoWrapPreview command={cmd} />;
    case "Send Stream":
      return <SendStreamPreview command={cmd} />;
  }
}

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

export function EnableAutoWrapPreview({
  command: cmd,
}: {
  command: EnableAutoWrapCommand;
}) {
  return (
    <Typography component="pre" variant="body2">
      {JSON.stringify(cmd, null, 2)}
    </Typography>
  );
}

export function SendStreamPreview({
  command: cmd,
}: {
  command: SendStreamCommand;
}) {
  // TODO: get balance with wagmi

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