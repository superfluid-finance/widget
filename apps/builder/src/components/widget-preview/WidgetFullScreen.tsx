import { FC } from "react";
import { Box, Drawer } from "@mui/material";
import { WidgetContent, WidgetContentProps } from "./WidgetContent";

const WidgetFullScreen: FC<WidgetContentProps> = (props) => {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <WidgetContent {...props} />
    </Box>
  );
};

export default WidgetFullScreen;
