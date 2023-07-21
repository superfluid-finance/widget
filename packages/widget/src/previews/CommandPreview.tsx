import ArrowForwardRoundedIcon_ from "@mui/icons-material/ArrowForwardRounded.js";
import NorthEastIcon_ from "@mui/icons-material/NorthEast.js";

import { Command } from "../commands.js";
import { normalizeIcon } from "../helpers/normalizeIcon.js";
import { EnableAutoWrapPreview } from "./EnableAutoWrapPreview.js";
import { SendStreamPreview } from "./SendStreamPreview.js";
import { WrapIntoSuperTokensPreview } from "./WrapIntoSuperTokensPreview.js";

export const NorthEastIcon = normalizeIcon(NorthEastIcon_);
export const UpgradeIcon = normalizeIcon(ArrowForwardRoundedIcon_);

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
