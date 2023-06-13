import { Card, Stack } from "@mui/material";
import CheckoutProduct from "./CheckoutProduct";
import { CommandHandlerProvider } from "./CommandHandlerProvider";
import FormProvider from "./FormProvider";
import PoweredBySf from "./PoweredBySf";
import Stepper from "./Stepper";
import { useWidget } from "./WidgetContext";

export function CheckoutContent() {
  const {
    layout: { elevated },
  } = useWidget();

  return (
    <Stack
      sx={{
        m: 3,
        containerType: "inline-size",
        containerName: "wrapper",
        minWidth: "min(510px, calc(100vw))",
      }}
    >
      <FormProvider>
        <Stack
          alignItems="start"
          justifyItems="center"
          columnGap={5}
          rowGap={3}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            ["@container wrapper (width >= 990px)"]: {
              gridTemplateColumns: "auto auto",
              gridTemplateRows: "auto 1fr",
              justifyContent: "center",
            },
          }}
        >
          <CheckoutProduct
            CardProps={{
              sx: { minWidth: "480px", maxWidth: "510px", flex: 1 },
            }}
          />

          <Card
            variant={elevated ? "elevation" : "outlined"}
            sx={{
              width: "min(510px, 100vw)",
              flex: 1,
              ["@container (width >= 990px)"]: {
                gridRow: "1/3",
                gridColumn: "2",
              },
            }}
          >
            <CommandHandlerProvider>
              <Stepper />
            </CommandHandlerProvider>
          </Card>

          <PoweredBySf sx={{ justifySelf: "center" }} />
        </Stack>
      </FormProvider>
    </Stack>
  );
}
