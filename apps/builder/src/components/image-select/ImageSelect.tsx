import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";

type ImageSelectProps = {
  label: string;
  onClick: () => void;
};

const ImageSelect: FC<ImageSelectProps> = ({ label, onClick }) => {
  const theme = useTheme();

  return (
    <Stack direction="column" gap={1} sx={{ flex: 1 }}>
      <Typography variant="subtitle2">{label}</Typography>
      <Button fullWidth sx={{ p: 0, m: 0 }} onClick={onClick}>
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
    </Stack>
  );
};

export default ImageSelect;
