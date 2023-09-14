import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Button } from "@mui/material";
import { useWeb3Modal } from "@web3modal/react";
import { FC } from "react";
import { useAccount, useDisconnect } from "wagmi";

import { shortenHex } from "../../utils/utils";

const ConnectWallet: FC = () => {
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  return address ? (
    <Button variant="outlined" size="large" onClick={() => disconnect()}>
      {shortenHex(address)}
    </Button>
  ) : (
    <Button
      variant="contained"
      size="large"
      onClick={open}
      startIcon={<WalletIcon />}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
