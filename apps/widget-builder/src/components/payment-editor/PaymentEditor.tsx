import { Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import theme from "../../theme";
import PaymentOptionView from "../payment-option-view/PaymentOptionView";
import SelectPaymentOption from "../select-payment-option/SelectPaymentOption";
import { WidgetProps } from "../widget-preview/WidgetPreview";

const ProductEditor: FC = () => {
  const { control, watch } = useFormContext<WidgetProps>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "paymentDetails.paymentOptions", // unique name for your Field Array
  });

  const [paymentOptions] = watch(["paymentDetails.paymentOptions"]);

  return (
    <Stack gap={1}>
      <Stack direction="column" gap={1.5}>
        <Typography variant="subtitle1" component="h2">
          Add Payment Option
        </Typography>
        <Controller
          control={control}
          name="paymentDetails.paymentOptions"
          render={() => <SelectPaymentOption onAdd={append} />}
        />

        <Divider sx={{ my: 2 }} />

        <Stack direction="column">
          <Stack
            direction="row"
            sx={{
              mb: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" component="h2">
              Payment Options
            </Typography>
            <Typography
              data-testid="added-payment-options-count"
              sx={{ color: theme.palette.grey[500] }}
            >
              Added: {paymentOptions.length}
            </Typography>
          </Stack>

          <Stack direction="column" gap={2.5}>
            {paymentOptions.length ? (
              paymentOptions.map(
                (
                  {
                    superToken,
                    chainId,
                    transferAmountEther,
                    flowRate,
                    receiverAddress,
                  },
                  i,
                ) => (
                  <PaymentOptionView
                    key={`${superToken.address}-${i}`}
                    upfrontPaymentAmountEther={transferAmountEther}
                    flowRate={
                      flowRate ?? {
                        amountEther: "0",
                        period: "month",
                      }
                    }
                    receiverAddress={receiverAddress}
                    superToken={superToken}
                    chainId={chainId}
                    index={i}
                    remove={remove}
                  />
                ),
              )
            ) : (
              <Typography data-testid="no-options-message" variant="caption">
                - None
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductEditor;
