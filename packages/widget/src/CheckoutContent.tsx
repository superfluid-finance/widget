import CheckoutProduct from "./CheckoutProduct";
import Stepper from "./Stepper";
import FormProvider from "./FormProvider";
import { Card, Stack } from "@mui/material";
import { CommandHandlerProvider } from "./CommandHandlerProvider";
import { useWidget } from "./WidgetContext";

export function CheckoutContent() {
  const {
    layout: { elevated },
  } = useWidget();
  return (
    <FormProvider>
      <Stack gap={3} sx={{ m: 3 }}>
        <CheckoutProduct />
        <Card variant={elevated ? "elevation" : "outlined"}>
          <CommandHandlerProvider>
            <Stepper />
          </CommandHandlerProvider>
        </Card>
      </Stack>
    </FormProvider>
  );
}
