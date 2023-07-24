import SvgIcon from "@mui/material/SvgIcon/SvgIcon.js";

export const normalizeIcon = (Icon: typeof SvgIcon) => {
  return (
    (Icon as any).default ? (Icon as any).default : Icon
  ) as typeof SvgIcon;
};
