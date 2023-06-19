import { Card, Stack, useTheme } from "@mui/material";
import CheckoutProduct from "./CheckoutProduct";
import { CommandHandlerProvider } from "./CommandHandlerProvider";
import FormProvider from "./FormProvider";
import PoweredBySuperfluid from "./PoweredBySuperfluid";
import Stepper from "./Stepper";
import { useWidget } from "./WidgetContext";
import { useMemo } from "react";

export function CheckoutContent() {
  const theme = useTheme();
  const {
    layout: { elevated },
  } = useWidget();

  const containerMediaQuery = useMemo(
    () =>
      `@container wrapper (width >= ${theme.breakpoints.values.md}${theme.breakpoints.unit})`,
    [theme]
  );

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
            [containerMediaQuery]: {
              gridTemplateColumns: "auto auto",
              gridTemplateRows: "auto 1fr",
              justifyContent: "center",
            },
          }}
        >
          <CheckoutProduct
            CardProps={{
              sx: {
                flex: 1,
                width: "min(510px, 100vw)",
                [containerMediaQuery]: {
                  maxWidth: "480px",
                },
              },
            }}
          />

          <Card
            variant={elevated ? "elevation" : "outlined"}
            sx={{
              width: "min(510px, 100vw)",
              flex: 1,
              [containerMediaQuery]: {
                gridRow: "1/3",
                gridColumn: "2",
              },
            }}
          >
            <CommandHandlerProvider>
              <Stepper />
            </CommandHandlerProvider>
          </Card>

          <PoweredBySuperfluid sx={{ justifySelf: "center" }} />
        </Stack>
      </FormProvider>
    </Stack>
  );
}
