import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Address, useAccount, useConnect, useDisconnect } from "wagmi";

import styles from "./ConnectWallet.module.css";

function shortenHex(address: string, length = 4) {
  return `${address.substring(0, 2 + length)}...${address.substring(
    address.length - length,
    address.length,
  )}`;
}

const ConnectWallet: FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [isClient, setIsClient] = useState(false);

  console.log(connectors);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div className={styles.ConnectBox}>
        {isConnected ? (
          <div className={styles.ConnectedWallet}>
            Connected with {shortenHex(address as Address)}
            <button className={styles.Disconnect} onClick={() => disconnect()}>
              Disconnect
            </button>
          </div>
        ) : (
          <div className={styles.ConnectorWrapper}>
            {connectors.map((connector) => {
              return (
                <Image
                  key={connector.id}
                  title={connector.name}
                  onClick={() => connect({ connector })}
                  src={`/${connector.id.toLowerCase()}-logo.png`}
                  width={48}
                  height={48}
                  alt="WalletConnect"
                />
              );
            })}
          </div>
        )}
      </div>
    )
  );
};

export default ConnectWallet;
