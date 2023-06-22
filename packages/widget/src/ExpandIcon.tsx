import ExpandMoreRoundedIcon_ from "@mui/icons-material/ExpandMoreRounded";
import { SxProps, styled } from "@mui/material";
import { FC } from "react";
import { normalizeIcon } from "./helpers/normalizeIcon";

const ExpandMoreRoundedIcon = normalizeIcon(ExpandMoreRoundedIcon_);

const StyledExpandIcon = styled(ExpandMoreRoundedIcon)<{ expanded: boolean }>(
  ({ theme, expanded }) => ({
    transform: `rotate(${expanded ? 180 : 0}deg)`,
    transition: theme.transitions.create("transform", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
  })
);

interface ExpandIconProps {
  expanded?: boolean;
  sx?: SxProps;
}

const ExpandIcon: FC<ExpandIconProps> = ({ expanded = false, sx = {} }) => (
  <StyledExpandIcon expanded={expanded} sx={sx} />
);

export default ExpandIcon;
