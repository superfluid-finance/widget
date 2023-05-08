import {
  Autocomplete,
  Box,
  Button,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Step,
  StepButton,
  StepContent,
  Stepper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { networks } from "../networkDefinitions";
import WidgetPreview, {
  WidgetProps,
} from "../components/widget-preview/WidgetPreview";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

import SelectPaymentOption from "../components/widget-preview/SelectPaymentOption";

const labelStyle = {
  fontWeight: 500,
};

export default function Home() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const formMethods = useForm<WidgetProps, any, WidgetProps>({
    defaultValues: {
      data: {
        productName: "Product Name",
        productDesc: "Product Description",
        paymentOptions: [],
        labels: {
          paymentOption: "Pay with",
          send: "Send",
        },
      },
    },
  });

  const { watch, control, getValues, setValue } = formMethods;

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "data.paymentOptions", // unique name for your Field Array
    }
  );

  const [data] = watch(["data"]);

  return (
    <Stack direction="row">
      <Stack
        sx={{
          width: 1000,
          height: "100vh",
        }}
      >
        <Stack direction="column" p={2} gap={2} sx={{ overflow: "auto" }}>
          <Typography variant="h6" sx={labelStyle}>
            Widget Customization
          </Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepButton>Product Name</StepButton>
              <StepContent>
                <Stack direction="column" gap={1}>
                  <Controller
                    control={control}
                    name="data.productName"
                    render={({ field: { value, onChange } }) => (
                      <TextField value={value} onChange={onChange} />
                    )}
                  />
                  <Button
                    disabled={!data.productName}
                    variant="contained"
                    onClick={() =>
                      setActiveStep((activeStep) => activeStep + 1)
                    }
                  >
                    Next
                  </Button>
                </Stack>
              </StepContent>
            </Step>
            <Step>
              <StepButton>Product Description</StepButton>
              <StepContent>
                <Stack direction="column" gap={1}>
                  <Controller
                    control={control}
                    name="data.productDesc"
                    render={({ field: { value, onChange } }) => (
                      <TextField value={value} onChange={onChange} />
                    )}
                  />
                  <Button
                    disabled={!data.productDesc}
                    variant="contained"
                    onClick={() =>
                      setActiveStep((activeStep) => activeStep + 1)
                    }
                  >
                    Next
                  </Button>
                </Stack>
              </StepContent>
            </Step>

            <Step>
              <StepButton>Payment Options</StepButton>
              <StepContent>
                <Stack direction="column" gap={1}>
                  <Controller
                    control={control}
                    name="data.paymentOptions"
                    render={() => <SelectPaymentOption onAdd={append} />}
                  />
                  <Stack direction="column">
                    <Typography variant="subtitle2">
                      Added Payment Options
                    </Typography>

                    <Box mx={1}>
                      {fields.length ? (
                        fields.map(({ network, superToken }, i) => (
                          <Stack
                            key={`${superToken.address}-${network.chainId}-${i}`}
                            direction="row"
                            sx={{
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="caption">{`${i + 1}. ${
                              superToken.name
                            } (${superToken.symbol}) on ${
                              network.name
                            }`}</Typography>
                            <IconButton size="small" onClick={() => remove(i)}>
                              <CancelIcon />
                            </IconButton>
                          </Stack>
                        ))
                      ) : (
                        <Typography variant="caption">- None</Typography>
                      )}
                    </Box>
                  </Stack>
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    disabled={data.paymentOptions.length === 0}
                    onClick={() =>
                      setActiveStep((activeStep) => activeStep + 1)
                    }
                  >
                    Next
                  </Button>
                </Stack>
              </StepContent>
            </Step>
            <Step>
              <StepButton
                onClick={() => setActiveStep((activeStep) => activeStep + 1)}
              >
                Labels
              </StepButton>
              <StepContent>
                <Stack direction="column" gap={1}>
                  {(
                    Object.keys(data.labels) as (keyof typeof data.labels)[]
                  ).map((label) => (
                    <Controller
                      key={label}
                      control={control}
                      name={`data.labels.${label}`}
                      render={({ field: { value, onChange } }) => (
                        <Stack
                          direction="row"
                          sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          gap={1}
                        >
                          <Typography sx={{ minWidth: 150, pl: 1 }}>
                            {label}:
                          </Typography>

                          <TextField
                            fullWidth
                            value={value}
                            onChange={onChange}
                          />
                        </Stack>
                      )}
                    />
                  ))}
                </Stack>
              </StepContent>
            </Step>
          </Stepper>
        </Stack>
      </Stack>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.grey[900],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WidgetPreview {...getValues()} />
      </Box>
    </Stack>
  );
}
