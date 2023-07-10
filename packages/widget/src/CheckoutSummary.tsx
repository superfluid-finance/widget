import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { parseEther } from "viem";
import { AccountAddressCard } from "./AccountAddressCard";
import { useCommandHandler } from "./CommandHandlerContext";
import FlowingBalance from "./FlowingBalance";
import StreamIndicator from "./StreamIndicator";
import SuccessImage from "./SuccessImage";
import { useWidget } from "./WidgetContext";
import { SendStreamCommand } from "./commands";
import { mapTimePeriodToSeconds } from "./core";
import { useAccount } from "wagmi";
import { runEventListener } from "./EventListeners";

export function CheckoutSummary() {
  const {
    getSuperToken,
    productDetails: { successURL, successText = "Continue to Merchant" },
    eventListeners,
  } = useWidget();

  const { address: accountAddress } = useAccount();

  const { commands } = useCommandHandler();

  const sendStreamCommand = commands.find(
    (x) => x.type === "Send Stream"
  )! as SendStreamCommand; // TODO: Do this more type-safe.

  const flowRate =
    parseEther(sendStreamCommand.flowRate.amountEther) /
    BigInt(mapTimePeriodToSeconds(sendStreamCommand.flowRate.period));

  // TODO: do the flowing balance animation with a speed-up
  const startingBalance = 0n;
  // TODO: Not correct to a second. Getting timestamp of when transaction was mined is a additional RPC call.
  const startingBalanceDate = useMemo(() => new Date(), []);

  const superToken = useMemo(
    () => getSuperToken(sendStreamCommand.superTokenAddress),
    [sendStreamCommand.superTokenAddress, getSuperToken]
  );

  const dashboardURL = useMemo(
    () =>
      `https://app.superfluid.finance/${
        accountAddress ? `?view=${accountAddress}` : ""
      }`,
    [accountAddress]
  );

  // Note: calling "onSuccess" through the "useEffect" hook is not optimal.
  // We make the assumption that "CheckoutSummary" is only rendered when the checkout is successful.
  // A more proper place would be inside a central state machine.
  useEffect(() => {
    runEventListener(eventListeners.onSuccess);
  }, [eventListeners.onSuccess]);

  return (
    <Box>
      <Stack direction="column" alignItems="center">
        <Typography variant="h5" component="span">
          Success!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your purchase was confirmed.
        </Typography>
      </Stack>

      <SuccessImage sx={{ mx: "auto", my: 3 }} />

      <Stack direction="column" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {`You've streamed`}
        </Typography>
        <Stack direction="row" alignItems="end" gap={0.5}>
          <Typography
            data-testid="streamed-amount"
            variant="h4"
            component="span"
          >
            <FlowingBalance
              flowRate={flowRate}
              startingBalance={startingBalance}
              startingBalanceDate={startingBalanceDate}
            />{" "}
          </Typography>
          <Typography
            data-testid="streamed-token"
            variant="caption"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            {superToken.symbol}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          mt: 3,
          mb: 4,
        }}
        alignItems="center"
        width="100%"
      >
        <AccountAddressCard
          dataTest="sender"
          address={sendStreamCommand.accountAddress}
          PaperProps={{ sx: { zIndex: 2 } }}
        />
        <StreamIndicator sx={{ mx: -1, zIndex: 0 }} />
        <AccountAddressCard
          dataTest="receiver"
          address={sendStreamCommand.receiverAddress}
          PaperProps={{ sx: { zIndex: 2 } }}
        />
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
      >
        {successURL && (
          <Button
            data-testid="continue-to-merchant-button"
            fullWidth
            variant="contained"
            size="large"
            href={successURL}
            onClick={() =>
              runEventListener(eventListeners.onSuccessButtonClick)
            }
          >
            {successText}
          </Button>
        )}
        <Button
          data-testid="open-dashboard-button"
          fullWidth
          size="large"
          variant="outlined"
          href={dashboardURL}
          target="_blank"
        >
          Open Superfluid Dashboard
        </Button>
      </Stack>
    </Box>
  );
}
