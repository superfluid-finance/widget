import { Paper, PaperProps, Stack, Typography } from "@mui/material";
import { FC, memo } from "react";
import SFLogo from "./SFLogo";

const PoweredBySf: FC<PaperProps> = ({ sx = {} }) => (
  <Paper
    variant="outlined"
    sx={{
      px: 4,
      py: 1.5,
      borderRadius: 0.5,
      background: "transparent",
      ...sx,
    }}
  >
    <Stack direction="row" gap={1} alignItems="center">
      <Typography variant="body2" color="text.secondary">
        Powered by
      </Typography>
      <SFLogo />
    </Stack>
  </Paper>
);

export default memo(PoweredBySf);
