import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/material";
import { FC, useCallback } from "react";

import useAnalyticsBrowser from "../../hooks/useAnalyticsBrowser";
import { ExportJSON } from "../../types/export-json";

interface DownloadJsonBtnProps {
  json: ExportJSON;
}

const DownloadJsonBtn: FC<DownloadJsonBtnProps> = ({ json }) => {
  const ajs = useAnalyticsBrowser();

  const onDownload = useCallback(() => {
    ajs.track("download_json", {
      productDetails: json.productDetails,
      paymentDetails: json.paymentDetails,
    });

    const jsonUrl = URL.createObjectURL(
      new Blob([JSON.stringify(json, null, 2)], { type: "application/json" }),
    );

    window.open(jsonUrl, "_blank");
  }, [ajs, json]);

  return (
    <Button
      data-testid="download-button"
      fullWidth
      size="large"
      color="primary"
      variant="contained"
      startIcon={<DownloadIcon />}
      onClick={onDownload}
    >
      Download JSON
    </Button>
  );
};

export default DownloadJsonBtn;
