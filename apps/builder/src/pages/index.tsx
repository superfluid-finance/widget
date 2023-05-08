import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { networks } from "../networkDefinitions";
import tokenList from "../tokenList";
import WidgetPreview, {
  WidgetProps,
} from "../components/widget-preview/WidgetPreview";

const labelStyle = {
  fontWeight: 500,
};

export default function Home() {
  const theme = useTheme();

  const formMethods = useForm<WidgetProps, any, WidgetProps>({
    defaultValues: {
      data: {
        productName: "Product Name",
        labels: {
          from: "From",
          to: "To",
          network: "Select Network",
          token: "SuperToken",
          amount: "Amount",
          send: "Send",
        },
        networks,
        tokens: tokenList.tokens,
      },
    },
  });

  const { watch, control, getValues, setValue } = formMethods;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    const selectedNetworks = networks.filter((network) =>
      value.includes(network.name)
    );

    setValue("data.networks", selectedNetworks);
  };

  const [data] = watch(["data"]);

  return (
    <Stack direction="row">
      <Stack
        sx={{
          width: 400,
          height: "100vh",
        }}
      >
        <Stack direction="column" p={2} gap={2} sx={{ overflow: "auto" }}>
          <Typography variant="h6" sx={labelStyle}>
            Widget Customization
          </Typography>
          <Stack direction="column" gap={0.5}>
            <Typography sx={labelStyle}>Product name</Typography>
            <Controller
              control={control}
              name="data.productName"
              render={({ field: { value, onChange } }) => (
                <TextField value={value} onChange={onChange} />
              )}
            />
          </Stack>
          <Stack direction="column" gap={0.5}>
            <Typography sx={labelStyle}>Allowed networks</Typography>
            <Controller
              control={control}
              name="data.networks"
              render={({ field: { value } }) => (
                <Select
                  multiple
                  value={value.map(({ name }) => name)}
                  onChange={handleChange}
                >
                  {networks.map((network) => (
                    <MenuItem value={network.name} key={network.chainId}>
                      {network.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Stack>
          <Stack direction="column" gap={0.5}>
            <Typography sx={labelStyle}>Labels</Typography>
            {(Object.keys(data.labels) as (keyof typeof data.labels)[]).map(
              (label) => (
                <Controller
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
                      <Typography sx={{ minWidth: 75, pl: 1 }}>
                        {label}:
                      </Typography>

                      <TextField fullWidth value={value} onChange={onChange} />
                    </Stack>
                  )}
                />
              )
            )}
          </Stack>
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
