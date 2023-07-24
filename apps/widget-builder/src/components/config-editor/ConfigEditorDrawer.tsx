import { Drawer } from "@mui/material";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";

import { WidgetProps } from "../widget-preview/WidgetPreview";
import ConfigEditor from "./ConfigEditor";

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
