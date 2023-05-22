import {
  PaymentOption,
  SupportedNetwork,
  supportedNetworks,
} from "superfluid-checkout-core";

export function mapSupportedNetworksFromPaymentOptions(
  paymentOptions: ReadonlyArray<PaymentOption>
): ReadonlyArray<SupportedNetwork> {
  // TODO: In some cases, produces this error: Type 'Set<5 | 80001 | 420 | 421613 | 43113 | 100 | 137 | 10 | 42161 | 43114 | 56 | 1 | 42220>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
  // const uniqueChainIds = [...new Set(paymentOptions.map((x) => x.chainId))];
  const uniqueChainIds = paymentOptions
    .map((x) => x.chainId)
    .filter((chainId, index, self) => self.indexOf(chainId) === index);

  return uniqueChainIds
    .map((chainId) => {
      const supportedNetwork = supportedNetworks.find(
        (network_) => network_.id === chainId
      );

      if (supportedNetwork === undefined) {
        // TODO: warn
        return null;
      }

      return supportedNetwork;
    })
    .filter((x): x is SupportedNetwork => x !== null);
}
