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
      <Stack direction="column">
        <Typography variant="subtitle2">Labels</Typography>
        <Stack direction="column" gap={1}>
          {(Object.keys(data.labels) as (keyof typeof data.labels)[]).map(
            (label) => (
              <Controller
                key={label}
                control={control}
                name={`data.labels.${label}`}
                render={({ field: { value, onChange } }) => (
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    gap={1}
                  >
                    <Typography sx={{ minWidth: 150, pl: 1 }}>
                      {label}:
                    </Typography>

                    <TextField fullWidth value={value} onChange={onChange} />
                  </Stack>
                )}
              />
            )
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UiEditor;
