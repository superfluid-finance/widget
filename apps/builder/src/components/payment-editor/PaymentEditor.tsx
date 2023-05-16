import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Controller, useFieldArray } from "react-hook-form";
import { EditorProps } from "../widget-preview/WidgetPreview";
import SelectPaymentOption from "../widget-preview/SelectPaymentOption";

const PaymentEditor: FC<EditorProps> = ({ control }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "paymentOptions", // unique name for your Field Array
    }
  );

  return (
    <Stack>
      <Stack direction="column" gap={1}>
        <Stack direction="column" flex={1}>
          <Typography variant="subtitle2">
            Receiver (TODO: separate more clearly from token)
          </Typography>
          <Controller
            control={control}
            name="paymentReceiver"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField value={value} onChange={onChange} onBlur={onBlur} />
            )}
          />
        </Stack>
        <Controller
          control={control}
          name="paymentOptions"
          render={() => <SelectPaymentOption onAdd={append} />}
        />
        <Stack direction="column">
          <Typography variant="subtitle2">Added Payment Options</Typography>
          <Typography>TODO: Needs fields to set flow rate</Typography>
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
