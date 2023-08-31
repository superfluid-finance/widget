import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { SuperfluidButton } from "@superfluid-finance/widget/components";
import { FC, useCallback } from "react";

import useAnalyticsBrowser from "../../hooks/useAnalyticsBrowser";
import usePinataIpfs from "../../hooks/usePinataIPFS";
import { ExportJSON } from "../../types/export-json";

interface IPFSPublishBtnProps {
  json: ExportJSON;
}

const IPFSPublishBtn: FC<IPFSPublishBtnProps> = ({ json }) => {
  const { publish, isLoading, ipfsHash } = usePinataIpfs({
    pinataMetadata: { name: `${json.productDetails.name}-superfluid-widget` },
  });

  const isPublished = !!ipfsHash;

  const ajs = useAnalyticsBrowser();

  const onPublish = useCallback(() => {
    ajs.track("publish_ipfs", { json });
    publish(json);
  }, [ajs, publish, json]);

  return (
    <Stack direction="column" gap={2}>
      <LoadingButton
        data-testid="publish-button"
        size="large"
        loading={isLoading}
        disabled={isPublished}
        variant="contained"
        onClick={onPublish}
        startIcon={isPublished ? <CloudDoneIcon /> : <CloudUploadIcon />}
      >
        {isPublished ? "Published to IPFS" : "Publish to IPFS"}
      </LoadingButton>
      {isPublished && (
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

export default IPFSPublishBtn;
