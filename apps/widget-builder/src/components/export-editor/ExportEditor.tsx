import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import usePinataIpfs from "../../hooks/usePinataIPFS";
import { useReadAsBase64 } from "../../hooks/useReadFileAsBase64";
import { ExportJSON } from "../../types/export-json";
import InputWrapper from "../form/InputWrapper";
import {
  WidgetProps,
  mapDisplaySettingsToTheme,
} from "../widget-preview/WidgetPreview";
import { SuperfluidButton } from "@superfluid-finance/widget/components";

type ExportOption = "json" | "ipfs";

const DownloadJsonButton: FC<{ json: ExportJSON }> = ({ json }) => (
  <Button
    data-testid="download-button"
    variant="contained"
    href={URL.createObjectURL(
      new Blob([JSON.stringify(json, null, 2)], { type: "application/json" }),
    )}
    download={`widget.json`}
    sx={{ color: "white" }}
  >
    Download JSON
  </Button>
);

const IpfsPublish: FC<{ json: ExportJSON }> = ({ json }) => {
  const { publish, isLoading, ipfsHash } = usePinataIpfs({
    pinataMetadata: { name: `${json.productDetails.name}-superfluid-widget` },
  });

  return (
    <Stack direction="column" gap={2}>
      <LoadingButton
        data-testid="publish-button"
        loading={isLoading}
        variant="contained"
        onClick={() => publish(json)}
        sx={{ color: "white" }}
      >
        Publish
      </LoadingButton>

      {ipfsHash && (
        <Stack direction="column" sx={{ alignItems: "center", mt: 4 }} gap={2}>
          <Typography
            data-testid="published-message"
            variant="subtitle2"
            textAlign="center"
          >
            Your config is published to IPFS. Test it with our hosted widget:
          </Typography>
          <SuperfluidButton
            fullWidth
            widgetUrl={`${process.env.NEXT_PUBLIC_EXPORT_BASE_URL}/${ipfsHash}`}
          />
        </Stack>
      )}
    </Stack>
  );
};

const switchExportOption = (
  selectedExportOption: ExportOption,
  json: ExportJSON,
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
    <Stack gap={2}>
      <InputWrapper title="Select export option">
        <Select
          data-testid="export-option"
          value={selectedExportOption}
          defaultValue="ipfs"
          onChange={({ target }) =>
            setSelectedExportOption(target.value as ExportOption)
          }
        >
          <MenuItem value="ipfs">Publish to IPFS to get a hosted link</MenuItem>
          <MenuItem value="json">Download JSON</MenuItem>
        </Select>
      </InputWrapper>
      {switchExportOption(selectedExportOption, json)}
    </Stack>
  );
};

export default ExportEditor;
