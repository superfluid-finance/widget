import { Button, Divider, Stack, Typography } from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import useFlowingBalance from "./useFlowingBalance";
import { parseEther } from "viem";
import { mapTimePeriodToSeconds } from "superfluid-checkout-core";
import { SendStreamCommand } from "./commands";
import { useMemo } from "react";
import { useWidget } from "./WidgetContext";
import FlowingBalance from "./FlowingBalance";

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
    // TODO: hackish
  const startingBalanceDate = useMemo(() => new Date(), []);

  const superToken = useMemo(
    () => getSuperToken(sendStreamCommand.superTokenAddress),
    [sendStreamCommand.superTokenAddress]
  );

  // TODO: add merchant link

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

      <Divider sx={{ my: 3 }} />

      <Stack direction="column" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          You've streamed
        </Typography>
        <Typography variant="h5" component="span">
          <FlowingBalance
            flowRate={flowRate}
            startingBalance={startingBalance}
            startingBalanceDate={startingBalanceDate}
          />{" "}
          {superToken.symbol}
        </Typography>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
      >
        {/* // TODO: Should these be target blank? */}
        {successURL && (
          <Button fullWidth variant="contained" href={successURL}>
            {/* // TODO: Make text configurable? */}
            Continue to Merchant
          </Button>
        )}
        <Button fullWidth variant="outlined" href="https://app.superfluid.finance" target="_blank">
          Open Superfluid Dashboard
        </Button>
      </Stack>
    </Stack>
  );
}
