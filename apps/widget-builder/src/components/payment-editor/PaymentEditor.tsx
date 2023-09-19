import AddIcon from "@mui/icons-material/Add";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  Fab,
  IconButton,
  Slide,
  SlideProps,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { PaymentOption } from "@superfluid-finance/widget";
import { FC, useCallback, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import useDemoMode from "../../hooks/useDemoMode";
import PaymentOptionView from "../payment-option-view/PaymentOptionView";
import SelectPaymentOption from "../select-payment-option/SelectPaymentOption";
import { WidgetProps } from "../widget-preview/WidgetPreview";

const ProductEditor: FC = () => {
  const theme = useTheme();
  const { control, watch } = useFormContext<WidgetProps>();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "paymentDetails.paymentOptions", // unique name for your Field Array
  });

  const [paymentOptions] = watch(["paymentDetails.paymentOptions"]);

  const [dialogMode, setDialogMode] = useState<"add" | "clone" | "edit">();
  const [targetedPaymentOption, setTargetedPaymentOption] = useState<{
    index: number;
    value: PaymentOption;
  }>();
  const [addCount, setAddCount] = useState(0);

  const handleClose = useCallback(() => {
    setDialogMode(undefined);
    setTargetedPaymentOption(undefined);
  }, []);

  const { setDemoPaymentDetails } = useDemoMode();
  const handleDemo = useCallback(() => {
    setAddCount((x) => x + 1);
    setDemoPaymentDetails();
  }, []);

  return (
    <>
      <Stack direction="column" gap={2}>
        <Box mb={1}>
          <Typography variant="h6" component="h2">
            Checkout Payment Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your preferred payment options to start receiving ongoing
            real-time payments powered by the Superfluid Protocol.
          </Typography>
        </Box>
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
                data-testid="add-payment-option-button"
                variant="contained"
                size="medium"
                color="primary"
                onClick={() => {
                  setDialogMode("add");
                }}
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
                          flowRate={flowRate}
                          receiverAddress={receiverAddress}
                          superToken={superToken}
                          chainId={chainId}
                          index={i}
                          clone={(index) => {
                            setTargetedPaymentOption({
                              index,
                              value: paymentOptions[index],
                            });
                            setDialogMode("clone");
                          }}
                          edit={(index) => {
                            setTargetedPaymentOption({
                              index,
                              value: paymentOptions[index],
                            });
                            setDialogMode("edit");
                          }}
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
              <Typography
                data-testid="no-options-message"
                variant="body1"
                color="text.secondary"
              >
                {"You haven't added any payment options yet."} Add your first
                one or{" "}
                <Typography
                  component="span"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  onClick={handleDemo}
                >
                  replace with demo data
                </Typography>
                .
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Dialog
        open={Boolean(dialogMode)}
        TransitionComponent={Slide}
        TransitionProps={
          {
            direction: "right",
            exit: false,
          } as SlideProps
        }
        keepMounted
        transitionDuration={{
          enter: theme.transitions.duration.enteringScreen,
          exit: theme.transitions.duration.shortest,
        }}
      >
        <AppBar color="transparent" position="relative" elevation={0}>
          <Stack
            component={Toolbar}
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="h6">
              {dialogMode === "edit" ? "Edit" : "Add"} Payment Option
            </Typography>
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
        <Divider />
        <Controller
          control={control}
          name="paymentDetails.paymentOptions"
          render={() => (
            <SelectPaymentOption
              key={addCount.toString()}
              selectedPaymentOption={targetedPaymentOption}
              dialogMode={dialogMode}
              onAdd={(props) => {
                setAddCount((x) => x + 1);
                append(props);
                handleClose();
              }}
              onEdit={(index, value: PaymentOption) => {
                update(index, value);
                handleClose();
              }}
              onDiscard={() => {
                handleClose();
                setAddCount((x) => x + 1);
                setTargetedPaymentOption(undefined);
              }}
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
          data-testid="wand-button"
          size="medium"
          color="secondary"
          sx={{
            position: "absolute",
            bottom: 72,
            left: 20,
          }}
          onClick={handleDemo}
        >
          <AutoFixHighIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default ProductEditor;
