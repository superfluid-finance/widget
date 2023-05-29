import { Typography } from "@mui/material";
import { EnableAutoWrapCommand } from "../commands";

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
