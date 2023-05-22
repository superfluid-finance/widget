import { Stack, Typography } from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import useFlowingBalance from "./useFlowingBalance";
import { formatEther, parseEther } from "viem";
import { mapTimePeriodToSeconds } from "superfluid-checkout-core";
import { SendStreamCommand } from "./commands";
import { useMemo } from "react";

export function CheckoutSummary() {
  const { commands } = useCommandHandler();

  const sendStreamCommand = commands.find(
    (x) => x.type === "Send Stream"
  )! as SendStreamCommand; // TODO: Do this more type-safe.

  const flowRate =
    parseEther(sendStreamCommand.flowRate.amountEther) /
    BigInt(mapTimePeriodToSeconds(sendStreamCommand.flowRate.period));

  // hack
  const date = useMemo(() => new Date(), []);
  const flowingBalance = useFlowingBalance(0n, date, flowRate);

  return (
    <Stack>
      <Typography variant="h1">Success!</Typography>
      <Typography variant="caption">{formatEther(flowingBalance)}</Typography>
      {/* <Button>Go to Superfluid Dashboard</Button> */}
    </Stack>
  );
}
