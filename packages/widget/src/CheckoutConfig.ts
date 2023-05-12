import { TokenList } from "@uniswap/token-lists";
import { PaymentDetails, ProductDetails } from "superfluid-checkout-core";

export type CheckoutConfig = Readonly<{
    productDetails: ProductDetails
    paymentDetails: PaymentDetails
    tokenList: TokenList
}>