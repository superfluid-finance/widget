import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import SelectPaymentOption from "../widget-preview/SelectPaymentOption";
import { networks } from "../../networkDefinitions";
import { ChainId } from "superfluid-checkout-widget";
import tokenList from "@tokdaniel/supertokenlist";
import { WidgetProps } from "../widget-preview/WidgetPreview";

type PaymentOptionViewProps = {
  superToken: { address: `0x${string}` };
  chainId: ChainId;
  index: number;
  remove: (index: number) => void;
};

const PaymentOptionView: FC<PaymentOptionViewProps> = ({
  superToken,
  chainId,
  index,
  remove,
}) => {
  const network = networks.find((n) => n.chainId === chainId);
  const token = Object.values(tokenList.tokens).find(
    (token) => token.address === superToken.address
  );
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="caption">{`${index + 1}. ${token?.name} (${
        token?.symbol
      }) on ${network?.name}`}</Typography>
      <IconButton size="small" onClick={() => remove(index)}>
        <CancelIcon />
      </IconButton>
    </Stack>
  );
};

const ProductEditor: FC = () => {
  const { control } = useFormContext<WidgetProps>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "paymentDetails.paymentOptions", // unique name for your Field Array
  });

  return (
    <Stack gap={1}>
      <Stack mb={4} gap={2}>
        <Typography variant="subtitle1">Product details</Typography>
        <Stack direction="column" gap={1}>
          <Typography variant="subtitle2">Product Name</Typography>
          <Controller
            control={control}
            name="productDetails.name"
            render={({ field: { value, onChange } }) => (
              <TextField value={value} onChange={onChange} />
            )}
          />
        </Stack>
        <Stack direction="column" gap={1}>
          <Typography variant="subtitle2">ProductDescription</Typography>
          <Controller
            control={control}
            name="productDetails.description"
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
      <Stack direction="column" gap={2}>
        <Typography variant="subtitle1">Payment details</Typography>
        <Stack direction="column" flex={1}>
          <Typography variant="subtitle2">
            Default Receiver
          </Typography>
          <Controller
            control={control}
            name="paymentDetails.receiverAddress"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField value={value} onChange={onChange} onBlur={onBlur} />
            )}
          />
        </Stack>
        <Stack gap={2}>
          <Typography variant="subtitle1">Add payment options</Typography>
          <Controller
            control={control}
            name="paymentDetails.paymentOptions"
            render={() => <SelectPaymentOption onAdd={append} />}
          />
        </Stack>

        <Stack direction="column">
          <Typography variant="subtitle2">Added Payment Options</Typography>
          <Box mx={1}>
            {fields.length ? (
              fields.map(({ superToken, chainId }, i) => (
                <PaymentOptionView
                  key={`${superToken.address}-${i}`}
                  superToken={superToken}
                  chainId={chainId}
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
