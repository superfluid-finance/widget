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
    ajs.track("download_json", { json });
  }, [ajs, json]);

  return (
    <Button
      data-testid="download-button"
      fullWidth
      size="large"
      variant="contained"
      href={URL.createObjectURL(
        new Blob([JSON.stringify(json, null, 2)], { type: "application/json" }),
      )}
      download={`widget.json`}
      sx={{ color: "white" }}
      onClick={onDownload}
    >
      Download JSON
    </Button>
  );
};

export default DownloadJsonBtn;
