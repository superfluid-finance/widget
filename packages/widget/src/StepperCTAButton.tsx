import { LoadingButton, LoadingButtonProps } from "@mui/lab";

export function StepperCTAButton(props: LoadingButtonProps) {
  return (
    <LoadingButton
      data-testid="continue-button"
      size="large"
      variant="contained"
      {...props}
    />
  );
}
