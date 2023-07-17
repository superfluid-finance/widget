import { FC } from "react";
import { useAccount, useDisconnect } from "wagmi";

const DemoWalletDisconnect: FC = () => {
  const { address } = useAccount();
  const disconnect = useDisconnect;

  if (address === "0xab1D164065aed9A3e42fca42c2c20997f369A2B0") {
    disconnect();
  }

  return null;
};

export default DemoWalletDisconnect;
