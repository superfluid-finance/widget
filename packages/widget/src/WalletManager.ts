/**
 * An interface for interacting with a wallet management library (e.g. Web3Modal, RainbowKit, ConnectKit etc).
 */
export interface WalletManager {
  /**
   * A callback to open the wallet connecting view (e.g. a modal to connect the wallet).
   */
  open(): void;
  /**
   * Is the wallet connecting view open? If it is, we might want to hide the widget.
   */
  isOpen: boolean;
}
