import { Button, Stack, StepContent as MUIStepContent } from "@mui/material";

export default function StepContentReview() {
  return (
    <MUIStepContent>
      <Stack>
        <Button variant="contained" fullWidth>
          Subscribe
        </Button>
      </Stack>
    </MUIStepContent>
  );
}
