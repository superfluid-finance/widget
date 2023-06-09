import { Box, Button, Drawer, Typography } from "@mui/material";
import { FC } from "react";
import ConfigEditor from "./ConfigEditor";
import { UseFormSetValue } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { WidgetProps } from "../widget-preview/WidgetPreview";

type ConfigEditorDrawerProps = {
  isOpen: boolean;
  value: WidgetProps;
  setIsOpen: (isOpen: boolean) => void;
  setValue: UseFormSetValue<WidgetProps>;
};

export const ConfigEditorDrawer: FC<ConfigEditorDrawerProps> = ({
  isOpen,
  setIsOpen,
  value,
  setValue,
}) => (
  <Drawer
    open={isOpen}
    onClose={() => setIsOpen(false)}
    keepMounted={true}
    anchor="right"
    PaperProps={{
      sx: { width: "40%" },
    }}
    ModalProps={{
      keepMounted: false,
    }}
  >
    <ConfigEditor value={value} setValue={setValue} />
    {/* <Button
          onClick={() => setIsOpen(false)}
          variant="text"
          endIcon={<CloseIcon />}
        >
          Close
        </Button> */}
  </Drawer>
);

export default ConfigEditorDrawer;
