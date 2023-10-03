import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useAccount, useWalletClient } from "wagmi";

import { AccountAddressCard } from "./AccountAddressCard.js";
import { useCommandHandler } from "./CommandHandlerContext.js";
import { SubscribeCommand } from "./commands.js";
import { mapTimePeriodToSeconds } from "./core/index.js";
import { runEventListener } from "./EventListeners.js";
import FlowingBalance from "./FlowingBalance.js";
import StreamIndicator from "./StreamIndicator.js";
import SuccessImage from "./SuccessImage.js";
import { useWidget } from "./WidgetContext.js";

export function CheckoutSummary() {
  const theme = useTheme();

  const {
    getSuperToken,
    productDetails: { successURL, successText = "Continue to Merchant" },
    existentialNFT,
    eventListeners,
  } = useWidget();

  const { address: accountAddress } = useAccount();
  const { data: walletClient } = useWalletClient();

  const { commands } = useCommandHandler();

  const subscribeCommand = commands.find(
    (x) => x.type === "Subscribe",
  )! as SubscribeCommand; // TODO: Do this more type-safe.

  const flowRate =
    subscribeCommand.flowRate.amountWei /
    BigInt(mapTimePeriodToSeconds(subscribeCommand.flowRate.period));

  // TODO: do the flowing balance animation with a speed-up
  const startingBalance = 0n;
  // TODO: Not correct to a second. Getting timestamp of when transaction was mined is a additional RPC call.
  const startingBalanceDate = useMemo(() => new Date(), []);

  const superToken = useMemo(
    () => getSuperToken(subscribeCommand.superTokenAddress),
    [subscribeCommand.superTokenAddress, getSuperToken],
  );

  const dashboardURL = useMemo(
    () =>
      `https://app.superfluid.finance/${
        accountAddress ? `?view=${accountAddress}` : ""
      }`,
    [accountAddress],
  );

  useEffect(() => {
    runEventListener(eventListeners.onRouteChange, {
      route: "success_summary",
    });
  }, [eventListeners.onRouteChange]);

  // Note: calling "onSuccess" through the "useEffect" hook is not optimal.
  // We make the assumption that "CheckoutSummary" is only rendered when the checkout is successful.
  // A more proper place would be inside a central state machine.
  useEffect(() => {
    runEventListener(eventListeners.onSuccess);

    // const chainId = walletClient?.chain.id as ChainId;
    // const nftCloneAddress = existentialNFT.deployments[chainId];

    // TODO: Import NFT with eth_watchAsset
  }, [eventListeners.onSuccess]);

  const onSuccessButtonClick = useCallback(() => {
    runEventListener(eventListeners.onSuccessButtonClick);
    runEventListener(eventListeners.onButtonClick, { type: "success_button" });
  }, [eventListeners.onSuccessButtonClick, eventListeners.onButtonClick]);

  const onOpenSuperfluidDashboardButtonClick = useCallback(
    () =>
      runEventListener(eventListeners.onButtonClick, {
        type: "superfluid_dashboard",
      }),
    [eventListeners.onButtonClick],
  );

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
        <Stack direction="row" alignItems="end" spacing={0.5}>
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
          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "1fr",
          },
        }}
        alignItems="center"
        width="100%"
      >
        <AccountAddressCard
          dataTest="sender"
          address={subscribeCommand.accountAddress}
          PaperProps={{ sx: { zIndex: 2 } }}
        />
        <StreamIndicator
          sx={{
            mx: -1,
            zIndex: 0,
            [theme.breakpoints.down("md")]: {
              transform: "rotate(90deg)",
              justifySelf: "center",
              transformOrigin: "center",
              my: 1,
            },
          }}
        />
        <AccountAddressCard
          dataTest="receiver"
          address={subscribeCommand.receiverAddress}
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
            onClick={onSuccessButtonClick}
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
          onClick={onOpenSuperfluidDashboardButtonClick}
        >
          Open Superfluid Dashboard
        </Button>
      </Stack>
    </Box>
  );
}
