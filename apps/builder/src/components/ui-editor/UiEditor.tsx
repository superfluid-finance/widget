import { Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { EditorProps } from "../widget-preview/WidgetPreview";

const UiEditor: FC<EditorProps> = ({ control, watch }) => {
  const [data] = watch(["data"]);

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Product Name</Typography>
        <Controller
          control={control}
          name="data.productName"
          render={({ field: { value, onChange } }) => (
            <TextField value={value} onChange={onChange} />
          )}
        />
      </Stack>
      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">ProductDesctiption</Typography>
        <Controller
          control={control}
          name="data.productDesc"
          render={({ field: { value, onChange } }) => (
            <TextField
              multiline
              minRows={4}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};

export default UiEditor;
