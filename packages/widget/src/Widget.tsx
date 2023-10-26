"use client";

import { Alert, AlertTitle, Container } from "@mui/material";
import { extendedSuperTokenList } from "@superfluid-finance/tokenlist";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { WidgetProps } from "./CheckoutConfig.js";
import { defaultNetworkAssets } from "./core/index.js";
import { WidgetCore } from "./WidgetCore.js";
import { ViewProps } from "./WidgetView.js";

/**
 * The entrypoint to the Superfluid widget.
 */
export function Widget({
  productDetails = {
    name: "",
  },
  personalData = [],
  tokenList = extendedSuperTokenList,
  stepper = { orientation: "vertical" },
  type = "page",
  networkAssets = defaultNetworkAssets,
  ...rest
}: WidgetProps & Partial<ViewProps>) {
  const props = {
    productDetails,
    personalData,
    tokenList,
    stepper,
    type,
    networkAssets,
    ...rest,
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <ErrorBoundary
      fallback={
        <Container maxWidth="sm">
          <Alert severity="error" variant="standard">
            <AlertTitle>Oops! The Checkout Widget crashed</AlertTitle>
            <p>
              Apologies for any inconvenience caused, but the Checkout Widget
              just experienced an unexpected problem and failed to load.
            </p>
            <p>
              {
                "We appreciate your understanding and patience. You might want to try reloading the page or come back later. If the issue persists, please don't hesitate to get in touch with us."
              }
            </p>
          </Alert>
        </Container>
      }
    >
      {mounted && <WidgetCore {...props} />}
    </ErrorBoundary>
  );
}
