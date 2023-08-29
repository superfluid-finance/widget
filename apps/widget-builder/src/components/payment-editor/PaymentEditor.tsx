import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { FC, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import useDemoMode from "../../hooks/useDemoMode";
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

  const [addCount, setAddCount] = useState(0);
  const { setDemoPaymentDetails } = useDemoMode();

  return (
    <Stack gap={1}>
      <Stack direction="column" gap={1.5}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" component="h2">
            Add Payment Option
          </Typography>
          <Tooltip title="Add demo product details" arrow>
            <IconButton onClick={setDemoPaymentDetails}>
              <AutoFixHighIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Controller
          key={addCount.toString()}
          control={control}
          name="paymentDetails.paymentOptions"
          render={() => (
            <SelectPaymentOption
              onAdd={(params) => {
                setAddCount((x) => x + 1);
                append(params);
              }}
            />
          )}
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
              paymentOptions
                .map(
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
                    <Zoom
                      in
                      appear={!!addCount}
                      key={`${superToken.address}-${i}`}
                    >
                      <Box>
                        <PaymentOptionView
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
                          remove={(params) => {
                            remove(params);
                            setAddCount(0);
                          }}
                        />
                      </Box>
                    </Zoom>
                  ),
                )
                .reverse()
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
