import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import SelectPaymentOption from "../widget-preview/SelectPaymentOption";
import { networks } from "../../networkDefinitions";
import { ChainId } from "@superfluid-finance/widget";
import tokenList from "@superfluid-finance/tokenlist";
import { WidgetProps } from "../widget-preview/WidgetPreview";
import theme from "../../theme";
import PaymentOptionView from "../payment-option-view/PaymentOptionView";

const ProductEditor: FC = () => {
  const { control, watch } = useFormContext<WidgetProps>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "paymentDetails.paymentOptions", // unique name for your Field Array
  });

  const defaultReceiverAddress = watch("paymentDetails.defaultReceiverAddress");

  return (
    <Stack gap={1}>
      <Stack mb={4} gap={2}>
        <Typography variant="h6">Payment Configuration</Typography>
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
          <Typography variant="subtitle2">Product Description</Typography>
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
        <Typography variant="h6">Add Payment Options</Typography>
        <Controller
          control={control}
          name="paymentDetails.paymentOptions"
          render={() => (
            <SelectPaymentOption
              onAdd={append}
              defaultReceiverAddress={defaultReceiverAddress as `0x${string}`}
            />
          )}
        />

        <Divider sx={{ my: 4 }} />

        <Stack direction="column">
          <Stack
            direction="row"
            sx={{
              mb: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Payment Details Summary</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: theme.palette.grey[500] }}
            >
              Added: {fields.length}
            </Typography>
          </Stack>

          <Stack direction="column" gap={2.5}>
            {fields.length ? (
              fields.map(
                ({ superToken, chainId, flowRate, receiverAddress }, i) => (
                  <PaymentOptionView
                    key={`${superToken.address}-${i}`}
                    flowRate={`${flowRate.amountEther} / ${flowRate.period}`}
                    receiverAddress={receiverAddress}
                    superToken={superToken}
                    chainId={chainId}
                    index={i}
                    remove={remove}
                  />
                )
              )
            ) : (
              <Typography variant="caption">- None</Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductEditor;
