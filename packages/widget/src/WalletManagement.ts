import { WalletClient } from "viem";

export interface WalletManagement {
  connect(): Promise<void>;
  walletClient?: WalletClient;
}