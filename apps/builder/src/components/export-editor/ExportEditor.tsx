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
      new Blob([JSON.stringify(json)], { type: "application/json" })
    )}
    download={`widget.json`}
  >
    download json
  </Button>
);

const IpfsPublish: FC<{ json: ExportJSON }> = ({ json }) => {
  const [pinataApiKey, setPinataApiKey] = useState<string>("");
  const [pinataSecretApiKey, setPinataSecretApiKey] = useState<string>("");

  const { publish, isLoading, ipfsHash } = usePinataIpfs(
    { pinataApiKey, pinataSecretApiKey },
    {
      pinataMetadata: { name: `${json.productDetails.name}-superfluid-widget` },
    }
  );

  return (
    <Stack direction="column" gap={2}>
      <Stack gap={1}>
        <Typography variant="subtitle2">Pinata API Key</Typography>
        <TextField
          value={pinataApiKey}
          onChange={({ target }) => setPinataApiKey(target.value)}
        />
      </Stack>
      <Stack>
        <Typography variant="subtitle2">Pinata Secret</Typography>
        <TextField
          value={pinataSecretApiKey}
          onChange={({ target }) => setPinataSecretApiKey(target.value)}
        />
      </Stack>
      <LoadingButton
        loading={isLoading}
        variant="contained"
        disabled={!(pinataApiKey && pinataSecretApiKey)}
        onClick={() => publish(json)}
      >
        Publish
      </LoadingButton>

      {ipfsHash && (
        <Stack direction="row">
          <Typography variant="subtitle2">
            Available on IPFS at: <b>{`ipfs://${ipfsHash}`}</b>
          </Typography>
          <Tooltip title="Check">
            <IconButton
              href={`https://ipfs.io/ipfs/${ipfsHash}`}
              target="_blank"
              size="large"
            >
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
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
        image: productImageBase64,
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
          <MenuItem value="ipfs">Publish to IPFS with Pinata</MenuItem>
        </Select>
      </Stack>
      {switchExportOption(selectedExportOption, json)}
    </Stack>
  );
};

export default ExportEditor;
