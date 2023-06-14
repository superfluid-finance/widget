import { Button, ButtonTypeMap } from "@mui/material";
import { FC } from "react";

export type SuperfluidButtonProps = {
  widgetUrl: string;
} & ButtonTypeMap["props"];

const SuperfluidButton: FC<SuperfluidButtonProps> = ({
  widgetUrl,
  children,
  ...props
}) => {
  return (
    <Button {...props} href={widgetUrl}>
      {children}
    </Button>
  );
};

export default SuperfluidButton;
