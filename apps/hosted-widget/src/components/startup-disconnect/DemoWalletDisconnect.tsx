import { FC, useEffect } from "react";
import { useAccount } from "wagmi";

const demoWalletAddress = "0xab1D164065aed9A3e42fca42c2c20997f369A2B0";

const DemoWalletDisconnect: FC = () => {
  const account = useAccount();

  useEffect(() => {
    if (account.address === demoWalletAddress) {
      account.connector?.disconnect();
    }
  }, [account]);

  return null;
};

export default DemoWalletDisconnect;
