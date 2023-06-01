import CheckoutProduct from "./CheckoutProduct";
import Stepper from "./Stepper";
import FormProvider from "./FormProvider";
import { Card, Stack } from "@mui/material";
import { CommandHandlerProvider } from "./CommandHandlerProvider";

export function CheckoutContent() {
  return (
    <FormProvider>
      <Stack gap={3} sx={{ m: 3 }}>
        <CheckoutProduct />
        <Card>
          <CommandHandlerProvider>
            <Stepper />
          </CommandHandlerProvider>
        </Card>
      </Stack>
    </FormProvider>
  );
}
