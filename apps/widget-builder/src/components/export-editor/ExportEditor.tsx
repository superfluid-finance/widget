import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { useReadAsBase64 } from "../../hooks/useReadFileAsBase64";
import { ExportJSON } from "../../types/export-json";
import BookDemoBtn from "../buttons/BookDemoBtn";
import DownloadJsonBtn from "../buttons/DownloadJsonBtn";
import IPFSPublishBtn from "../buttons/IPFSPublishBtn";
import InputWrapper from "../form/InputWrapper";
import {
  mapDisplaySettingsToTheme,
  WidgetProps,
} from "../widget-preview/WidgetPreview";

type ExportOption = "json" | "ipfs";

const switchExportOption = (
  selectedExportOption: ExportOption,
  json: ExportJSON,
) => {
  switch (selectedExportOption) {
    case "json":
      return <DownloadJsonBtn json={json} />;
    case "ipfs":
      return <IPFSPublishBtn json={json} />;
    default:
      return <></>;
  }
};

const ExportEditor: FC = () => {
  const { watch } = useFormContext<WidgetProps>();

  const [productDetails, paymentDetails, displaySettings, layout] = watch([
    "productDetails",
    "paymentDetails",
    "displaySettings",
    "type",
  ]);

  const { base64: productImageBase64 } = useReadAsBase64(
    productDetails.imageURI,
  );
  // const [logoBase64] = useReadAsBase64(displaySettings.logo);

  const json: ExportJSON = useMemo(
    () => ({
      productDetails: {
        ...productDetails,
        imageURI: productImageBase64,
        // logo: logoBase64,
      },
      paymentDetails,
      type: layout,
      theme: mapDisplaySettingsToTheme(displaySettings),
    }),
    [
      productDetails,
      paymentDetails,
      displaySettings,
      layout,
      productImageBase64,
      //   logoBase64,
    ],
  );

  const [selectedExportOption, setSelectedExportOption] =
    useState<ExportOption>("ipfs");

  return (
    <Stack height="100%" gap={2}>
      <Typography variant="h6" component="h2">
        Checkout Export
      </Typography>
      <Box>
        <InputWrapper
          title="Export option"
          sx={{
            width: "100%",
          }}
        >
          {(id) => (
            <Select
              id={id}
              labelId={`label-${id}`}
              data-testid="export-option"
              value={selectedExportOption}
              defaultValue="ipfs"
              onChange={({ target }) =>
                setSelectedExportOption(target.value as ExportOption)
              }
              fullWidth
            >
              <MenuItem value="ipfs">
                Publish to IPFS to get a hosted link
              </MenuItem>
              <MenuItem value="json">Download JSON</MenuItem>
            </Select>
          )}
        </InputWrapper>
        <Box textAlign="center" sx={{ my: 3 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
            How does it work?
          </Typography>
          <Typography color="text.secondary">
            {selectedExportOption === "ipfs"
              ? "You’ll create a hosted link to your checkout which you can embed in your CTAs."
              : selectedExportOption === "json"
              ? "Use this JSON configuration when embedding react or web component directly to your code."
              : ""}
          </Typography>
        </Box>
        {switchExportOption(selectedExportOption, json)}
      </Box>

      <Stack height="100%" justifyContent="flex-end" alignItems="center">
        <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
          Do you have more questions?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          We’ll show you how your business can benefit from using our checkout.
        </Typography>
        <BookDemoBtn>Book a Demo</BookDemoBtn>
      </Stack>
    </Stack>
  );
};

export default ExportEditor;
