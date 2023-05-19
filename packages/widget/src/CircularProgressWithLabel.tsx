import {
  Box,
  CircularProgress,
  CircularProgressProps,
} from "@mui/material";
import { PropsWithChildren } from "react";

export function CircularProgressWithLabel({
  children,
  ...props
}: PropsWithChildren<CircularProgressProps>) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="indeterminate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Box>
    </Box>
  );
}
