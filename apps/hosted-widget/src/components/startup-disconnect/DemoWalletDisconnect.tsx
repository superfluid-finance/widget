import { FC, useEffect } from "react";
import {
  generatePrivateKey,
  privateKeyToAccount,
} from "viem/accounts";
import { useAccount } from "wagmi";

const demoAccount = privateKeyToAccount(
  (process.env.NEXT_PUBLIC_THE_THING ?? generatePrivateKey()) as `0x${string}`,
);

const DemoWalletDisconnect: FC = () => {
  const account = useAccount();

  useEffect(() => {
    if (account.address === demoAccount.address) {
      account.connector?.disconnect();
    }
  }, [account]);

  return null;
};

export default DemoWalletDisconnect;
