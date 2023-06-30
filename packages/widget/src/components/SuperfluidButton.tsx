import { Button, ButtonTypeMap, colors } from "@mui/material";
import { FC } from "react";
import SuperfluidLogo from "../SuperfluidLogo";

export type SuperfluidButtonProps = {
  widgetUrl: string;
  pulse?: boolean;
} & ButtonTypeMap["props"];

const SuperfluidButton: FC<SuperfluidButtonProps> = ({
  widgetUrl,
  children,
  pulse = true,
  ...props
}) => {
  return (
    <Button
      {...props}
      target="_blank"
      variant="contained"
      size="large"
      href={widgetUrl}
      sx={{
        color: "white",
        textTransform: "none",
        ...(pulse
          ? {
              animation: "pulse 3000ms ease-in-out infinite",
            }
          : {}),
        overflow: "hidden",
        whiteSpace: "nowrap",

        "@keyframes pulse": {
          "0%": {
            transform: "scale(0.97.5)",
            boxShadow: `0 0px 0px ${colors.green[500]}`,
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: `0 0px 15px ${colors.green[500]}`,
          },
          "100%": {
            transform: "scale(0.97.5)",
            boxShadow: `0 0px 0px ${colors.green[300]}`,
          },
        },
      }}
      endIcon={<SuperfluidLogo fill={"#FFF"} />}
    >
      {children ? children : "Pay with"}
    </Button>
  );
};

export default SuperfluidButton;
