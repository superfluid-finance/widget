import { FC } from "react";
import { Box, Drawer, useTheme } from "@mui/material";
import { WidgetContent, WidgetContentProps } from "./WidgetContent";

const WidgetFullScreen: FC<WidgetContentProps> = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 8,
        backgroundColor: theme.palette.grey[200],
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WidgetContent {...props} />
    </Box>
  );
};

export default WidgetFullScreen;
