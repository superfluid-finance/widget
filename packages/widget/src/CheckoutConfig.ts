import { TokenList } from "@uniswap/token-lists";
import { PaymentOption, ProductDetails } from "superfluid-checkout-core";
import { Client } from "@wagmi/core";

type WalletManagement = {
    wagmiClient: Client
    connectWallet: () => void
}

export type CheckoutConfig = Readonly<{
    productDetails: ProductDetails
    paymentOptions: PaymentOption[]
    tokenList: TokenList
}>