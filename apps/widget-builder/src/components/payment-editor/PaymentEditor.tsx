import AddIcon from "@mui/icons-material/Add";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Box,
  Dialog,
  Fab,
  IconButton,
  Stack,
  Toolbar,
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

  const [isAdding, setIsAdding] = useState(false);
  const [addCount, setAddCount] = useState(0);

  const handleOpen = () => {
    setIsAdding(true);
  };

  const handleClose = () => {
    setIsAdding(false);
  };

  const { setDemoPaymentDetails } = useDemoMode();

  return (
    <Stack gap={1}>
      <Stack direction="column" gap={1.5}>
        <Zoom in unmountOnExit>
          <Fab
            color="primary"
            onClick={handleOpen}
            sx={{
              position: "absolute",
              bottom: 68,
              right: 16,
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" component="h2">
            Edit Payment Details
          </Typography>
          <Tooltip title="Replace with demo payment details" arrow>
            <IconButton
              onClick={() => {
                setAddCount((x) => x + 1);
                setDemoPaymentDetails();
              }}
            >
              <AutoFixHighIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="column">
          <Stack
            direction="row"
            sx={{
              mb: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2">Payment Options</Typography>
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

      <Dialog open={isAdding}>
        <AppBar color="primary" sx={{ position: "relative" }}>
          <Stack
            component={Toolbar}
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Add Payment Option</Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </AppBar>
        <Controller
          control={control}
          name="paymentDetails.paymentOptions"
          render={() => (
            <SelectPaymentOption
              onAdd={(props) => {
                setAddCount((x) => x + 1);
                append(props);
                handleClose();
              }}
              onDiscard={handleClose}
            />
          )}
        />
      </Dialog>
    </Stack>
  );
};

export default ProductEditor;
