import { FC } from "react";
import { Drawer } from "@mui/material";
import { WidgetContent, WidgetContentProps } from "./WidgetContent";

type DrawerProps = {
  isOpen: boolean;
};

const WidgetDrawer: FC<WidgetContentProps & DrawerProps> = (props) => {
  return (
    <Drawer
      variant="temporary"
      open={props.isOpen}
      anchor="right"
      PaperProps={{
        sx: { width: 500, p: 4 },
      }}
      hideBackdrop
      sx={{ width: 0 }}
    >
      <WidgetContent {...props} />
    </Drawer>
  );
};

export default WidgetDrawer;
