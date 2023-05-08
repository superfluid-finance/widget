import { Box, MenuItem, Select, SelectChangeEvent, Stack, Typography, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { networks } from "../networkDefinitions";
import tokenList from "../tokenList";
import { NullableObject } from "../types/general";
import WidgetPreview, { WidgetProps } from "../components/widget-preview/WidgetPreview";

export default function Home() {
  const theme = useTheme();

  const formMethods = useForm<NullableObject<WidgetProps>, any, WidgetProps>({
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
      // customStyle: {
      //   root: {
      //     width: 500,
      //     px: 4,
      //     py: 4,
      //   },
      // },
    },
  });

  const { watch, control, getValues } = formMethods;

  // const handleChange = (event: SelectChangeEvent<typeof selectedNetworks>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setSelectedNetworks(typeof value === "string" ? value.split(",") : value);
  // };

  return (
    <Stack direction="row">
      <Stack
        sx={{
          width: 400,
          height: "100vh",
        }}
      >
        <Stack direction="column" p={2}>
          <Typography variant="h6">Widget Customization</Typography>
          <Stack direction="column">
            <Controller
              control={control}
              name="data.networks"
              render={() => (
                <></>
                // <Select multiple value={selectedNetworks}>
                //   {networks.map((network) => (
                //     <MenuItem value={network.name} key={network.chainId}>
                //       {network.name}
                //     </MenuItem>
                //   ))}
                // </Select>
              )}
            />
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
