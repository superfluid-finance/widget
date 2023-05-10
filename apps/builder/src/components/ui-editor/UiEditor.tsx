import {
  Box,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Controller } from "react-hook-form";
import { EditorProps } from "../widget-preview/WidgetPreview";
import ImageSelect from "../image-select/ImageSelect";

const UiEditor: FC<EditorProps> = ({ control, watch }) => {
  const [displaySettings] = watch(["displaySettings"]);

  const [selectedProductImage, setSelectedProductImage] = useState<File | null>(
    null
  );
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Product Name</Typography>
        <Controller
          control={control}
          name="productName"
          render={({ field: { value, onChange } }) => (
            <TextField value={value} onChange={onChange} />
          )}
        />
      </Stack>
      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">ProductDesctiption</Typography>
        <Controller
          control={control}
          name="productDesc"
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
      <Stack direction="row" gap={2}>
        <Controller
          control={control}
          name="displaySettings.productImageURL"
          render={({ field: { value, onChange } }) => (
            <ImageSelect
              label="Product image"
              onClick={(file) =>
                onChange({ target: { value: URL.createObjectURL(file) } })
              }
              onRemove={() => onChange({ target: { value: "" } })}
              imageSrc={value}
            />
          )}
        />
        <Controller
          control={control}
          name="displaySettings.logoURL"
          render={({ field: { value, onChange } }) => (
            <ImageSelect
              label="Logo"
              onClick={(file) =>
                onChange({ target: { value: URL.createObjectURL(file) } })
              }
              onRemove={() => onChange({ target: { value: "" } })}
              imageSrc={value}
            />
          )}
        />
      </Stack>
      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">
          Field border-radius: {displaySettings.inputRadius}
        </Typography>
        <Controller
          control={control}
          name="displaySettings.inputRadius"
          render={({ field: { value, onChange } }) => (
            <Slider step={1} value={Number(value)} onChange={onChange} />
          )}
        />
      </Stack>

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">
          Button border-radius: {displaySettings.buttonRadius}
        </Typography>
        <Controller
          control={control}
          name="displaySettings.buttonRadius"
          render={({ field: { value, onChange } }) => (
            <Slider step={1} value={Number(value)} onChange={onChange} />
          )}
        />
      </Stack>

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Font Family</Typography>
        <Controller
          control={control}
          name="displaySettings.fontFamily"
          render={({ field: { value, onChange } }) => (
            <TextField value={value} onChange={onChange} />
          )}
        />
      </Stack>

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Primary color</Typography>
        <Stack direction="row" gap={1}>
          <Controller
            control={control}
            name="displaySettings.primaryColor"
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                placeholder="#0000000"
                onChange={onChange}
              />
            )}
          />
          <Box
            sx={{
              width: 100,
              borderRadius: 1,
              backgroundColor: displaySettings.primaryColor,
            }}
          />
        </Stack>
      </Stack>

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Secondary color</Typography>
        <Stack direction="row" gap={1}>
          <Controller
            control={control}
            name="displaySettings.secondaryColor"
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                placeholder="#0000000"
                onChange={onChange}
              />
            )}
          />
          <Box
            sx={{
              width: 100,
              borderRadius: 1,
              backgroundColor: displaySettings.secondaryColor,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UiEditor;
