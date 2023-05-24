import { Card, Paper, Stack, Typography } from "@mui/material";
import {
  Command,
  EnableAutoWrapCommand,
  SendStreamCommand,
  WrapIntoSuperTokensCommand,
} from "../commands";
import Close from "@mui/icons-material/Close";
import { normalizeIcon } from "../helpers/normalizeIcon";
import { useWidget } from "../WidgetContext";

const CloseIcon = normalizeIcon(Close);

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
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Stack component={Paper}>{underlyingToken.symbol}</Stack>
      <Paper>
        <CloseIcon />
      </Paper>
      <Stack component={Paper}>{superToken.symbol}</Stack>
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
  return (
    <Typography component="pre" variant="body2">
      {JSON.stringify(cmd, null, 2)}
    </Typography>
  );
}
