import { Divider, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import theme from "../../theme";
import InputWrapper from "../form/InputWrapper";
import PaymentOptionView from "../payment-option-view/PaymentOptionView";
import SelectPaymentOption from "../select-payment-option/SelectPaymentOption";
import { WidgetProps } from "../widget-preview/WidgetPreview";

const ProductEditor: FC = () => {
  const { control, watch, setValue } = useFormContext<WidgetProps>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "paymentDetails.paymentOptions", // unique name for your Field Array
  });

  const defaultReceiverAddress = watch("paymentDetails.defaultReceiverAddress");

  return (
    <Stack gap={1}>
      <Stack mb={4} gap={2}>
        <Typography variant="subtitle1">Payment Configuration</Typography>

        <InputWrapper title="Product Name">
          <Controller
            control={control}
            name="productDetails.name"
            render={({ field: { value, onChange } }) => (
              <TextField
                placeholder="Your Product Name"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </InputWrapper>

        <InputWrapper title="Product Description">
          <Controller
            control={control}
            name="productDetails.description"
            render={({ field: { value, onChange } }) => (
              <TextField
                placeholder="Your Product Description"
                multiline
                minRows={4}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </InputWrapper>
      </Stack>

      <Stack direction="column" gap={2}>
        <Typography variant="subtitle1">Add Payment Options</Typography>
        <Controller
          control={control}
          name="paymentDetails.paymentOptions"
          render={() => (
            <SelectPaymentOption
              onAdd={append}
              defaultReceiverAddress={defaultReceiverAddress as `0x${string}`}
              setDefaultReceiver={(address: string) =>
                setValue("paymentDetails.defaultReceiverAddress", address)
              }
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
            <Typography variant="subtitle1">Payment Details Summary</Typography>
            <Typography sx={{ color: theme.palette.grey[500] }}>
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
