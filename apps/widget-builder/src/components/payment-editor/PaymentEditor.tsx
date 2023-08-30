import AddIcon from "@mui/icons-material/Add";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Fab,
  IconButton,
  Slide,
  SlideProps,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { FC, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import useDemoMode from "../../hooks/useDemoMode";
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
    <>
      <Stack gap={1}>
        <Stack direction="column" gap={1.5}>
          <Typography variant="h6" component="h2">
            Checkout Payment Details
          </Typography>
          <Stack direction="column">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                mb: 2,
              }}
            >
              <Typography variant="subtitle1" component="h3">
                <Stack direction="row" alignItems="center" gap={1}>
                  Payment Options
                  <Typography
                    component="span"
                    data-testid="added-payment-options-count"
                    color="text.secondary"
                  >
                    ({paymentOptions.length})
                  </Typography>
                </Stack>
              </Typography>
              <Stack direction="row" gap={1}>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={handleOpen}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Stack>
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
      <Dialog
        open={isAdding}
        TransitionComponent={Slide}
        TransitionProps={
          {
            direction: "right",
          } as SlideProps
        }
        keepMounted
      >
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
              key={addCount.toString()}
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
      <Tooltip
        title="Replace with demo payment details"
        placement="right"
        arrow
      >
        <Fab
          size="medium"
          color="secondary"
          sx={{
            position: "absolute",
            bottom: 72,
            left: 20,
          }}
          onClick={() => {
            setAddCount((x) => x + 1);
            setDemoPaymentDetails();
          }}
        >
          <AutoFixHighIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default ProductEditor;
