import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Button } from "@mui/material";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { FC } from "react";
import { useDisconnect } from "wagmi";

import { shortenHex } from "../../utils/utils";

const ConnectWallet: FC = () => {
  const { address } = useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();

  return address ? (
    <Button variant="outlined" size="large" onClick={() => disconnect()}>
      {shortenHex(address)}
    </Button>
  ) : (
    <Button
      variant="contained"
      size="large"
      onClick={() => open({ view: "Connect" })}
      startIcon={<WalletIcon />}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
