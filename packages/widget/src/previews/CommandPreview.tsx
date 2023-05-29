import {
  Command,
} from "../commands";
import UpgradeIcon_ from "@mui/icons-material/Upgrade";
import { normalizeIcon } from "../helpers/normalizeIcon";
import NorthEastIcon_ from "@mui/icons-material/NorthEast";
import { WrapIntoSuperTokensPreview } from "./WrapIntoSuperTokensPreview";
import { EnableAutoWrapPreview } from "./EnableAutoWrapPreview";
import { SendStreamPreview } from "./SendStreamPreview";

export const NorthEastIcon = normalizeIcon(NorthEastIcon_);
export const UpgradeIcon = normalizeIcon(UpgradeIcon_);

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