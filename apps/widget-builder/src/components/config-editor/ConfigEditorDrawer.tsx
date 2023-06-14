import { Box, Button, Drawer, Typography } from "@mui/material";
import { FC } from "react";
import ConfigEditor from "./ConfigEditor";
import { WidgetProps } from "../widget-preview/WidgetPreview";
import { UseFormSetValue } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

type ConfigEditorDrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  getValues: () => WidgetProps;
  setValue: UseFormSetValue<WidgetProps>;
};

export const ConfigEditorDrawer: FC<ConfigEditorDrawerProps> = ({
  isOpen,
  setIsOpen,
  getValues,
  setValue,
}) => {
  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      keepMounted={true}
      anchor="right"
      PaperProps={{
        sx: { width: 500 },
      }}
    >
      <Box py={2}>
        <Typography variant="h6" textAlign="center">
          Current Config
        </Typography>
      </Box>

      <ConfigEditor value={getValues()} setValue={setValue} />
      <Button
        onClick={() => setIsOpen(false)}
        variant="text"
        endIcon={<CloseIcon />}
      >
        Close
      </Button>
    </Drawer>
  );
};

export default ConfigEditorDrawer;
