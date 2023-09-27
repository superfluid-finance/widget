import { SvgIcon } from "@mui/material";

export const normalizeIcon = (Icon: any) => {
  return (Icon.default ? Icon.default : Icon) as typeof SvgIcon;
};
