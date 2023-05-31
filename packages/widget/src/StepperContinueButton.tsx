import { useStepper } from "./StepperContext";
import { Button, ButtonProps } from "@mui/material";

export function StepperContinueButton(props: ButtonProps) {
  const { handleNext } = useStepper();

  return (
    <Button
      size="large"
      variant="contained"
      onClick={() => void handleNext()}
      {...props}
    />
  );
}
