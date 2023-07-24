import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { SuperfluidButton } from "@superfluid-finance/widget/components";
import { FC } from "react";

import usePinataIpfs from "../../hooks/usePinataIPFS";
import { ExportJSON } from "../../types/export-json";

interface IPFSPublishBtnProps {
  json: ExportJSON;
}

const IPFSPublishBtn: FC<IPFSPublishBtnProps> = ({ json }) => {
  const { publish, isLoading, ipfsHash } = usePinataIpfs({
    pinataMetadata: { name: `${json.productDetails.name}-superfluid-widget` },
  });

  return (
    <Stack direction="column" gap={2}>
      <LoadingButton
        data-testid="publish-button"
        size="large"
        loading={isLoading}
        variant="contained"
        onClick={() => publish(json)}
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

export default IPFSPublishBtn;
