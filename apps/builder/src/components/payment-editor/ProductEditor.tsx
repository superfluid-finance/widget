import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Controller, useFieldArray } from "react-hook-form";
import { EditorProps } from "../widget-preview/WidgetPreview";
import SelectPaymentOption from "../widget-preview/SelectPaymentOption";
import { Network } from "../../networkDefinitions";
import { SuperTokenInfo } from "@tokdaniel/superfluid-tokenlist";

type PaymentOptionViewProps = {
  superToken: SuperTokenInfo;
  network: Network;
  index: number;
  remove: (index: number) => void;
};

const PaymentOptionView: FC<PaymentOptionViewProps> = ({
  superToken,
  network,
  index,
  remove,
}) => (
  <Stack
    direction="row"
    sx={{
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Typography variant="caption">{`${index + 1}. ${superToken.name} (${
      superToken.symbol
    }) on ${network.name}`}</Typography>
    <IconButton size="small" onClick={() => remove(index)}>
      <CancelIcon />
    </IconButton>
  </Stack>
);

const ProductEditor: FC<EditorProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "paymentOptions", // unique name for your Field Array
  });

  return (
    <Stack gap={1}>
      <Stack mb={4} gap={2}>
        <Typography variant="subtitle1">Product details</Typography>
        <Stack direction="column" gap={1}>
          <Typography variant="subtitle2">Product Name</Typography>
          <Controller
            control={control}
            name="productName"
            render={({ field: { value, onChange } }) => (
              <TextField value={value} onChange={onChange} />
            )}
          />
        </Stack>
        <Stack direction="column" gap={1}>
          <Typography variant="subtitle2">ProductDescription</Typography>
          <Controller
            control={control}
            name="productDesc"
            render={({ field: { value, onChange } }) => (
              <TextField
                multiline
                minRows={4}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack direction="column" gap={1}>
        <Typography variant="subtitle1">Payment options</Typography>
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
                <PaymentOptionView
                  key={`${superToken.address}-${network.chainId}-${i}`}
                  superToken={superToken}
                  network={network}
                  index={i}
                  remove={remove}
                />
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

export default ProductEditor;
