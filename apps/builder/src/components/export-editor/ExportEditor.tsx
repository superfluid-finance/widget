import { Button, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { ExportJSON } from "../../types/export-json";
import { useFormContext } from "react-hook-form";
import {
  WidgetProps,
  mapDisplaySettingsToTheme,
} from "../widget-preview/WidgetPreview";

const ExportEditor: FC = () => {
  const { control, watch } = useFormContext<WidgetProps>();

  const [productDetails, paymentDetails, displaySettings, layout] = watch([
    "productDetails",
    "paymentDetails",
    "displaySettings",
    "layout",
  ]);

  const json: ExportJSON = useMemo(
    () => ({
      productDetails,
      paymentDetails,
      layout,
      theme: mapDisplaySettingsToTheme(displaySettings),
    }),
    [productDetails, paymentDetails, displaySettings, layout]
  );

  const [selectedExportOption, setSelectedExportOption] = useState("json");

  return (
    <Stack gap={2}>
      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Select export option</Typography>
        <Select
          value={selectedExportOption}
          onChange={({ target }) => setSelectedExportOption(target.value)}
        >
          <MenuItem value="json">Download JSON</MenuItem>
          <MenuItem value="ipfs">Publish to IPFS</MenuItem>
        </Select>
      </Stack>
      {selectedExportOption === "json" ? (
        <Button
          variant="contained"
          href={URL.createObjectURL(
            new Blob([JSON.stringify(json)], { type: "application/json" })
          )}
          download={`widget.json`}
        >
          download json
        </Button>
      ) : (
        "IPFS"
      )}
    </Stack>
  );
};

export default ExportEditor;
