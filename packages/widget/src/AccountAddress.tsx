import { useMemo } from "react";
import { Address, getAddress } from "viem";
import {
  Chain,
  mainnet,
  useEnsAvatar,
  useEnsName,
  useNetwork,
} from "wagmi";

import { ChildrenProp, shortenHex } from "./utils.js";

type Results = {
  ensNameResult: ReturnType<typeof useEnsName>;
  ensAvatarResult: ReturnType<typeof useEnsAvatar>;
  checksumAddress: Address;
  shortenedAddress: string;
};

type Props = {
  children: (results: Results) => ChildrenProp;
  address: Address;
};

export function AccountAddress({ children, address }: Props) {
  const checksumAddress = useMemo(() => getAddress(address), [address]);
  const shortenedAddress = useMemo(
    () => shortenHex(checksumAddress),
    [checksumAddress],
  );

  const { chains } = useNetwork();

  // Find the first configured chain which has ENS resolver supported. Prefer Mainnet.
  const ensChain = useMemo(
    () =>
      [chains.find((x) => x.id === mainnet.id), ...chains]
        .filter((x): x is Chain => !!x)
        .find((x) => x.contracts?.ensUniversalResolver),
    [chains],
  );
  const ensChainId = ensChain?.id;

  const ensNameResult = useEnsName(
    ensChainId
      ? {
          address: checksumAddress,
          chainId: ensChainId,
        }
      : undefined,
  );

  const ensAvatarResult = useEnsAvatar(
    ensNameResult.data && ensChainId
      ? { name: ensNameResult.data, chainId: ensChainId }
      : undefined,
  );

  const result = {
    ensNameResult,
    ensAvatarResult,
    checksumAddress,
    shortenedAddress,
  };

  return <>{children(result)}</>;
}
