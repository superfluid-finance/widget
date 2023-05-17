import {
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
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

type ExportOption = "json" | "ipfs";

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
      pinataMetadata: { name: "superfluid-widget" },
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
        <Typography variant="subtitle2">
          Available on IPFS at: <b>{`ipfs://${ipfsHash}`}</b>
        </Typography>
      )}
    </Stack>
  );
};

const ExportEditor: FC = () => {
  const { watch } = useFormContext<WidgetProps>();

  const [productDetails, paymentDetails, displaySettings, layout] = watch([
    "productDetails",
    "paymentDetails",
    "displaySettings",
    "layout",
  ]);

  const [productImageBase64] = useReadAsBase64(displaySettings.productImage);
  const [logoBase64] = useReadAsBase64(displaySettings.logo);

  const json: ExportJSON = useMemo(
    () => ({
      productDetails: {
        ...productDetails,
        image: productImageBase64,
        //@ts-ignore <- TODO: add logo image to productDetails
        logo: logoBase64,
      },
      paymentDetails,
      layout,
      theme: mapDisplaySettingsToTheme(displaySettings),
    }),
    [
      productDetails,
      paymentDetails,
      displaySettings,
      layout,
      productImageBase64,
      logoBase64,
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
          <MenuItem value="ipfs">Publish to IPFS</MenuItem>
        </Select>
      </Stack>
      {switchExportOption(selectedExportOption, json)}
    </Stack>
  );
};

export default ExportEditor;
