import { Button, ButtonProps } from "@mui/material";

export function StepperCTAButton(props: ButtonProps) {
  return (
    <Button
      data-testid="continue-button"
      size="large"
      variant="contained"
      {...props}
    />
  );
}
