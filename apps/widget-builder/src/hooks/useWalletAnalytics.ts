import { AnalyticsBrowser } from "@segment/analytics-next";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useChainId } from "wagmi";

const NOT_CONNECTED = {
  isConnected: false,
  address: undefined,
  chainId: undefined,
};

const useWalletAnalytics = ({
  analyticsBrowser,
}: {
  analyticsBrowser: AnalyticsBrowser;
}) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { track, identify, reset } = analyticsBrowser;

  const current = useMemo(
    () =>
      isConnected
        ? {
            address,
            isConnected,
            chainId,
          }
        : NOT_CONNECTED,
    [address, isConnected, chainId]
  );

  const [previous, setPrevious] = useState<typeof current>(NOT_CONNECTED);

  useEffect(() => {
    if (current === previous) {
      return;
    }

    if (current.isConnected !== previous.isConnected) {
      if (current.isConnected) {
        track("Wallet Connected", current).then(() => identify(current));
      } else {
        track("Wallet Disconnected", current).then(() => reset());
      }
    } else {
      if (current.isConnected && previous.isConnected) {
        if (current.chainId != previous.chainId) {
          track("Wallet Network Changed", current);
        }
        if (current.address != previous.address) {
          track("Wallet Account Changed", current)
            .then(() => reset()) // Reset before not to associate next identification with previous wallet address.
            .then(() => identify(current));
        }
      }
    }

    setPrevious(current);
  }, [current]);
};

export default useWalletAnalytics;
