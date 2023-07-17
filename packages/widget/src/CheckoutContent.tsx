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
    stepper: { orientation },
    type,
  } = useWidget();

  const containerMediaQuery = useMemo(
    () =>
      orientation === "vertical"
        ? `@container wrapper (width >= ${theme.breakpoints.values.md}${theme.breakpoints.unit})`
        : "",
    [theme, orientation],
  );

  const containerType = useMemo(
    () => (["drawer", "dialog"].includes(type) ? "normal" : "inline-size"),
    [type],
  );

  return (
    <Stack
      sx={{
        containerType,
        containerName: "wrapper",
        m: 3,
        [theme.breakpoints.down("sm")]: {
          m: 2,
        },
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
                width: "100%",
                maxWidth: "510px",
                [containerMediaQuery]: {
                  width: "480px",
                },
              },
            }}
          />

          <Card
            variant={elevated ? "elevation" : "outlined"}
            sx={{
              width: "100%",
              maxWidth: "510px",
              flex: 1,
              [containerMediaQuery]: {
                width: "510px",
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
