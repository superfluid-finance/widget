import { TokenList } from "@uniswap/token-lists";
import { PaymentOption, ProductDetails } from "superfluid-checkout-core";

export type CheckoutConfig = Readonly<{
    productDetails: ProductDetails
    paymentOptions: PaymentOption[]
    tokenList: TokenList
}>