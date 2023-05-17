import { Button, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { ExportJSON } from "../../types/export-json";
import { useFormContext } from "react-hook-form";
import {
  WidgetProps,
  mapDisplaySettingsToTheme,
} from "../widget-preview/WidgetPreview";

type ExportOption = "json" | "ipfs";

const switchExportOption = (
  selectedExportOption: ExportOption,
  json: ExportJSON
) => {
  switch (selectedExportOption) {
    case "json":
      return <DownloadJsonButton json={json} />;
    case "ipfs":
      return <Typography>ipfs</Typography>;
    default:
      return <></>;
  }
};

const DownloadJsonButton: FC<{ json: ExportJSON }> = (json) => (
  <Button
    variant="contained"
    href={URL.createObjectURL(
      new Blob([JSON.stringify(json)], { type: "application/json" })
    )}
    download={`widget.json`}
  >
    download json
  </Button>
);

const ExportEditor: FC = () => {
  const { watch } = useFormContext<WidgetProps>();

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

  const [selectedExportOption, setSelectedExportOption] =
    useState<ExportOption>("json");

  return (
    <Stack gap={2}>
      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Select export option</Typography>
        <Select
          value={selectedExportOption}
          onChange={({ target }) =>
            setSelectedExportOption(target.value as ExportOption)
          }
        >
          <MenuItem value="json">Download JSON</MenuItem>
          <MenuItem value="ipfs">Publish to IPFS</MenuItem>
        </Select>
      </Stack>
      {switchExportOption(selectedExportOption, json)}
    </Stack>
  );
};

export default ExportEditor;
