import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { ChangeEvent, FC, useRef } from "react";

type ImageSelectProps = {
  id: string;
  imageSrc?: string;
  onClick: (file: File) => void;
  onRemove: () => void;
};

const ImageSelect: FC<ImageSelectProps> = ({
  id,
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
      <Stack direction="row" justifyContent="flex-end">
        {imageSrc && (
          <IconButton onClick={onRemove} size="small" sx={{ p: 0 }}>
            <CancelIcon data-testid="remove-image-button" />
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
          <img
            data-testid="product-image"
            src={imageSrc}
            height={90}
            alt="not found"
          />
        </Box>
      ) : (
        <Button fullWidth sx={{ p: 0, m: 0 }} onClick={triggerFileUpload}>
          <input
            data-testid="file-upload-field"
            hidden
            type="file"
            name={id}
            ref={inputRef}
            onChange={handleFileUpload}
          />
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
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
        </Button>
      )}
    </Stack>
  );
};

export default ImageSelect;
