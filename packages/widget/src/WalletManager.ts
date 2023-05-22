export interface WalletManager {
  open(): Promise<void>;
  isOpen: boolean;
}