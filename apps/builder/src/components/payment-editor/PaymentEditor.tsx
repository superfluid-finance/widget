import { Box, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { WidgetProps } from "../widget-preview/WidgetPreview";
import SelectPaymentOption from "../widget-preview/SelectPaymentOption";

type PaymentEditorProps = {
  control: Control<WidgetProps, any>;
};

const PaymentEditor: FC<PaymentEditorProps> = ({ control }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "data.paymentOptions", // unique name for your Field Array
    }
  );

  return (
    <Stack>
      <Stack direction="column" gap={1}>
        <Controller
          control={control}
          name="data.paymentOptions"
          render={() => <SelectPaymentOption onAdd={append} />}
        />
        <Stack direction="column">
          <Typography variant="subtitle2">Added Payment Options</Typography>

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
                  } (${superToken.symbol}) on ${network.name}`}</Typography>
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
      </Stack>
    </Stack>
  );
};

export default PaymentEditor;

// Labels

/* <Stack direction="column" gap={1}>
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
</Stack> */
