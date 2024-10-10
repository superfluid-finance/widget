import { AnalyticsBrowser } from "@segment/analytics-next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

const NOT_CONNECTED = {
  isConnected: false,
} as const;

const useWalletAnalytics = ({
  analyticsBrowser,
}: {
  analyticsBrowser: AnalyticsBrowser;
}) => {
  const {
    chain: activeChain,
    connector: activeConnector,
    isConnected,
    address: activeAccountAddress,
  } = useAccount();
  const { track, reset } = analyticsBrowser;

  const identify = useCallback(
    (wallet: { isConnected: true; address: Address }) =>
      analyticsBrowser.identify(wallet.address, {
        walletAddress: wallet.address,
      }),
    [analyticsBrowser],
  );

  const currentWallet = useMemo(
    () => ({
      ...(isConnected && activeConnector && activeAccountAddress
        ? ({
            isConnected: true,
            address: activeAccountAddress,
            connector: activeConnector.name,
            connectorId: activeConnector.id,
            ...(activeChain
              ? {
                  network: activeChain.name,
                  networkId: activeChain.id,
                }
              : {}),
          } as const)
        : NOT_CONNECTED),
    }),
    [isConnected, activeConnector, activeAccountAddress, activeChain],
  );

  const [prevWallet, setPrevWallet] =
    useState<typeof currentWallet>(NOT_CONNECTED);

  useEffect(() => {
    if (currentWallet === prevWallet) {
      return;
    }

    if (currentWallet.isConnected !== prevWallet.isConnected) {
      if (currentWallet.isConnected) {
        track("Wallet Connected", currentWallet).then(() =>
          identify(currentWallet),
        );
      } else {
        track("Wallet Disconnected", currentWallet).then(() => reset());
      }
    } else {
      if (currentWallet.isConnected && prevWallet.isConnected) {
        if (currentWallet.networkId != prevWallet.networkId) {
          track("Wallet Network Changed", currentWallet);
        }
        if (currentWallet.address != prevWallet.address) {
          track("Wallet Account Changed", currentWallet)
            .then(() => reset()) // Reset before not to associate next identification with previous wallet address.
            .then(() => identify(currentWallet));
        }
      }
    }

    setPrevWallet(currentWallet);
  }, [currentWallet]);
};

export default useWalletAnalytics;
