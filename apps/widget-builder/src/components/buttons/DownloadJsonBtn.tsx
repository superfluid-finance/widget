import { Button } from "@mui/material";
import { FC } from "react";
import { ExportJSON } from "../../types/export-json";

interface DownloadJsonBtnProps {
  json: ExportJSON;
}

const DownloadJsonBtn: FC<DownloadJsonBtnProps> = ({ json }) => (
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
  >
    Download JSON
  </Button>
);

export default DownloadJsonBtn;
