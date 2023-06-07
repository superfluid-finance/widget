import { Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { parseEther } from "viem";
import { AccountAddressCard } from "./AccountAddressCard";
import { useCommandHandler } from "./CommandHandlerContext";
import FlowingBalance from "./FlowingBalance";
import StreamIndicator from "./StreamIndicator";
import { useWidget } from "./WidgetContext";
import { SendStreamCommand } from "./commands";
import { mapTimePeriodToSeconds } from "./core";

export function CheckoutSummary() {
  const {
    getSuperToken,
    productDetails: { successURL = "https://superfluid.finance" }, // TODO: remove the default
  } = useWidget();
  const { commands } = useCommandHandler();

  const sendStreamCommand = commands.find(
    (x) => x.type === "Send Stream"
  )! as SendStreamCommand; // TODO: Do this more type-safe.

  const flowRate =
    parseEther(sendStreamCommand.flowRate.amountEther) /
    BigInt(mapTimePeriodToSeconds(sendStreamCommand.flowRate.period));

  // TODO: do the flowing balance animation with a speed-up
  const startingBalance = 0n;
  // TODO: hackish, use transaction date instead
  const startingBalanceDate = useMemo(() => new Date(), []);

  const superToken = useMemo(
    () => getSuperToken(sendStreamCommand.superTokenAddress),
    [sendStreamCommand.superTokenAddress, getSuperToken]
  );

  return (
    <Stack sx={{ m: 3 }}>
      <Stack direction="column" alignItems="center">
        <Typography variant="h5" component="span">
          Success!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your purchase was confirmed.
        </Typography>
      </Stack>

      <Stack direction="column" alignItems="center" sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {`You've streamed`}
        </Typography>
        <Stack direction="row" alignItems="end" gap={0.5}>
          <Typography variant="h4" component="span">
            <FlowingBalance
              flowRate={flowRate}
              startingBalance={startingBalance}
              startingBalanceDate={startingBalanceDate}
            />{" "}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
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
          address={sendStreamCommand.accountAddress}
          PaperProps={{ sx: { zIndex: 2 } }}
        />
        <StreamIndicator sx={{ mx: -1, zIndex: 0 }} />
        <AccountAddressCard
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
        {/* // TODO: Should these be target blank? */}
        {successURL && (
          <Button fullWidth variant="contained" size="large" href={successURL}>
            {/* // TODO: Make text configurable? */}
            Continue to Merchant
          </Button>
        )}
        <Button
          fullWidth
          size="large"
          variant="outlined"
          href="https://app.superfluid.finance"
          target="_blank"
        >
          Open Superfluid Dashboard
        </Button>
      </Stack>
    </Stack>
  );
}
