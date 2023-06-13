import ExpandMoreRoundedIcon_ from "@mui/icons-material/ExpandMoreRounded";
import { styled } from "@mui/material";
import { FC } from "react";
import { normalizeIcon } from "./helpers/normalizeIcon";

const ExpandMoreRoundedIcon = normalizeIcon(ExpandMoreRoundedIcon_);

const StyledExpandIcon = styled(ExpandMoreRoundedIcon)<{ expanded: boolean }>(
  ({ expanded }) => ({
    transform: `rotate(${expanded ? 180 : 0}deg)`,
  })
);

interface ExpandIconProps {
  expanded?: boolean;
}

const ExpandIcon: FC<ExpandIconProps> = ({ expanded = false }) => (
  <StyledExpandIcon expanded={expanded} />
);

export default ExpandIcon;
