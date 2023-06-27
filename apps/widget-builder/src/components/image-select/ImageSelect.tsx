import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEvent, FC, useRef } from "react";

type ImageSelectProps = {
  label: string;
  imageSrc?: string;
  onClick: (file: File) => void;
  onRemove: () => void;
};

const ImageSelect: FC<ImageSelectProps> = ({
  label,
  imageSrc,
  onClick,
  onRemove,
}) => {
  const theme = useTheme();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileUpload = () => {
    inputRef.current?.click();
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onClick(event.target.files[0]);
    }
  };

  return (
    <Stack direction="column" gap={1} sx={{ flex: 1 }}>
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography variant="body1" fontWeight="500">
          {label}
        </Typography>
        {imageSrc && (
          <IconButton onClick={onRemove} size="small" sx={{ p: 0 }}>
            <CancelIcon />
          </IconButton>
        )}
      </Stack>

      {imageSrc ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={imageSrc} height={90} alt="not foundg" />
        </Box>
      ) : (
        <Button fullWidth sx={{ p: 0, m: 0 }} onClick={triggerFileUpload}>
          <input
            hidden
            type="file"
            name={label}
            ref={inputRef}
            onChange={handleFileUpload}
          />
          <Box
            sx={{
              width: "100%",
              p: 0.5,
              borderStyle: "solid",
              borderRadius: 1,
              borderWidth: 0.5,
              borderColor: theme.palette.grey[400],
              height: 90,
            }}
          >
            <Stack direction="column">
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.grey[500],
                  textTransform: "none",
                  textAlign: "left",
                }}
              >
                Optional
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AddIcon
                  fontSize="large"
                  sx={{ color: theme.palette.grey[700] }}
                />
              </Box>
            </Stack>
          </Box>
        </Button>
      )}
    </Stack>
  );
};

export default ImageSelect;
