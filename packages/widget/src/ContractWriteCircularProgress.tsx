import {
  Box,
  CircularProgress,
  circularProgressClasses,
  CircularProgressProps,
  Typography,
  useTheme,
} from "@mui/material";

type Props = CircularProgressProps & {
  index: number;
  total: number;
};

export function ContractWriteCircularProgress({
  index,
  total,
  ...props
}: Props) {
  const theme = useTheme();
  const isDeterminate = total > 1;
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        sx={{
          color: theme.palette.primary.light,
          position: "absolute",
        }}
        value={100}
        {...props}
      />
      <CircularProgress
        data-testid={
          isDeterminate
            ? "transaction-progress-circular-progress"
            : "spinning-circular-progress"
        }
        disableShrink={!isDeterminate} // Don't pass "true" with "determinate" because MUI will whine.
        variant={isDeterminate ? "determinate" : "indeterminate"}
        value={index === 0 ? 4 : (index / total) * 100}
        sx={{
          animationDuration: theme.transitions.duration.complex,
          color: theme.palette.primary.dark,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        {...props}
      />
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
        {total > 1 && (
          <Typography
            data-testid="transaction-count"
            variant="body2"
            component="div"
            fontWeight={600}
          >
            {index}/{total}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
