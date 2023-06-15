import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ExportJSON } from "../../types/export-json";
import { useFormContext } from "react-hook-form";
import {
  WidgetProps,
  mapDisplaySettingsToTheme,
} from "../widget-preview/WidgetPreview";
import { useReadAsBase64 } from "../../hooks/useReadFileAsBase64";
import usePinataIpfs from "../../hooks/usePinataIPFS";
import { LoadingButton } from "@mui/lab";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type ExportOption = "json" | "ipfs";

const DownloadJsonButton: FC<{ json: ExportJSON }> = ({ json }) => (
  <Button
    variant="contained"
    href={URL.createObjectURL(
      new Blob([JSON.stringify(json, null, 2)], { type: "application/json" })
    )}
    download={`widget.json`}
    sx={{ color: "white" }}
  >
    download json
  </Button>
);

const IpfsPublish: FC<{ json: ExportJSON }> = ({ json }) => {
  const { publish, isLoading, ipfsHash } = usePinataIpfs({
    pinataMetadata: { name: `${json.productDetails.name}-superfluid-widget` },
  });

  return (
    <Stack direction="column" gap={2}>
      <LoadingButton
        loading={isLoading}
        variant="contained"
        onClick={() => publish(json)}
        sx={{ color: "white" }}
      >
        Publish
      </LoadingButton>

      {ipfsHash && (
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Typography variant="body2">Go to our hosted widget:</Typography>

          <IconButton
            href={`${process.env.NEXT_PUBLIC_EXPORT_BASE_URL}/${ipfsHash}`}
            target="_blank"
            size="large"
          >
            <OpenInNewIcon />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

const switchExportOption = (
  selectedExportOption: ExportOption,
  json: ExportJSON
) => {
  switch (selectedExportOption) {
    case "json":
      return <DownloadJsonButton json={json} />;
    case "ipfs":
      return <IpfsPublish json={json} />;
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
    "layout",
  ]);

  const [productImageBase64] = useReadAsBase64(productDetails.imageURI);
  // const [logoBase64] = useReadAsBase64(displaySettings.logo);

  const json: ExportJSON = useMemo(
    () => ({
      productDetails: {
        ...productDetails,
        imageURI: productImageBase64 ?? "",
        // logo: logoBase64,
      },
      paymentDetails,
      layout,
      theme: mapDisplaySettingsToTheme(layout, displaySettings),
    }),
    [
      productDetails,
      paymentDetails,
      displaySettings,
      layout,
      productImageBase64,
      //   logoBase64,
    ]
  );

  const [selectedExportOption, setSelectedExportOption] =
    useState<ExportOption>("ipfs");

  return (
    <Stack gap={2}>
      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Select export option</Typography>
        <Select
          value={selectedExportOption}
          defaultValue="ipfs"
          onChange={({ target }) =>
            setSelectedExportOption(target.value as ExportOption)
          }
        >
          <MenuItem value="ipfs">Publish to IPFS to get a hosted link</MenuItem>
          <MenuItem value="json">Download JSON</MenuItem>
        </Select>
      </Stack>
      {switchExportOption(selectedExportOption, json)}
    </Stack>
  );
};

export default ExportEditor;
