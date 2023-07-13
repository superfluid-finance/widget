import { Link, Paper, PaperProps, Stack, Typography } from "@mui/material";
import { FC, memo } from "react";
import SuperfluidLogo from "./SuperfluidLogo";

const PoweredBySuperfluid: FC<PaperProps> = ({ sx = {} }) => (
  <Paper
    component={Link}
    variant="outlined"
    href="https://superfluid.finance"
    target="_blank"
    sx={{
      px: 4,
      py: 1.5,
      borderRadius: 0.5,
      textDecoration: "none",
      ...sx,
    }}
  >
    <Stack direction="row" gap={1} alignItems="center">
      <Typography variant="body2" color="text.secondary">
        Powered by
      </Typography>
      <SuperfluidLogo />
    </Stack>
  </Paper>
);

export default memo(PoweredBySuperfluid);
