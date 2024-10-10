import { Chain } from "wagmi/chains";

/**
 * An interface for interacting with a wallet management library (e.g. Web3Modal, RainbowKit, ConnectKit etc).
 *
 * @example
 * Example with React & RainbowKit.
 *
 * ```typescript
 * const { openConnectModal, connectModalOpen } = useConnectModal();
 * const walletManager = useMemo(
 *   () => ({
 *     open: async () => openConnectModal?.(),
 *     isOpen: connectModalOpen,
 *   }),
 *   [openConnectModal, connectModalOpen]
 * );
 * ```
 *
 * @example
 * Example with React & Web3Modal.
 *
 * ```typescript
 * const { open, isOpen } = useWeb3Modal();
 * const walletManager = useMemo(
 *   () => ({
 *     open,
 *     isOpen,
 *   }),
 *   [open, isOpen],
 * );
 * ```
 */
export interface WalletManager {
  /**
   * A callback to open the wallet connecting view (e.g. a modal to connect the wallet).
   */
  open({ chain }: { chain?: Chain }): void;
  /**
   * Is the wallet connecting view open? If it is, we might want to hide the widget.
   */
  isOpen: boolean;
}
