import { WalletClient } from "viem";

export interface WidgetWalletManagement {
  connect(): Promise<void>;
  walletClient?: WalletClient;
}