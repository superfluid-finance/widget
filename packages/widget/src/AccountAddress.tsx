import { Address, getAddress } from "viem";
import { ChildrenProp, shortenHex } from "./utils";
import { useEnsAvatar, useEnsName } from "wagmi";
import { useMemo } from "react";

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
    [checksumAddress]
  );

  const ensNameResult = useEnsName({
    address: checksumAddress,
    chainId: 1,
  });

  const ensAvatarResult = useEnsAvatar(
    ensNameResult.data ? { name: ensNameResult.data, chainId: 1 } : undefined
  );

  const result = {
    ensNameResult,
    ensAvatarResult,
    checksumAddress,
    shortenedAddress,
  };

  return <>{children(result)}</>;
}
