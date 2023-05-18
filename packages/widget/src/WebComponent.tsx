import * as ReactDom from "react-dom";
import { CheckoutWidget } from "./CheckoutWidget";
import { PaymentDetails, ProductDetails } from "superfluid-checkout-core";
import { Theme } from "@mui/material";
import { TokenList } from "@uniswap/token-lists";

class SuperfluidWidget extends HTMLElement {
  mountPoint!: HTMLSpanElement;
  productDetails!: ProductDetails;
  paymentDetails!: PaymentDetails;
  tokenList!: TokenList;
  theme!: Theme;
  type!: "drawer" | "dialog" | "full-screen" | "page";

  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);

    const productDetails = this.getAttribute("productDetails");
    const paymentDetails = this.getAttribute("paymentDetails");
    const tokenList = this.getAttribute("tokenList");
    const theme = this.getAttribute("theme");
    const type = this.getAttribute("type");

    if (!(productDetails && paymentDetails && tokenList && theme && type)) {
      throw new Error(
        `Missing required attributes ${JSON.stringify({
          productDetails,
          paymentDetails,
          tokenList,
          theme,
          type,
        })}`
      );
    } else {
      this.productDetails = JSON.parse(productDetails);
      this.paymentDetails = JSON.parse(paymentDetails);
      this.tokenList = JSON.parse(tokenList);
      this.theme = JSON.parse(theme);
      this.type = type as typeof this.type;
    }

    ReactDom.render(
      this.type === "page" ? (
        <CheckoutWidget
          productDetails={this.productDetails}
          paymentDetails={this.paymentDetails}
          tokenList={this.tokenList}
          theme={this.theme}
          type={this.type}
        />
      ) : (
        <CheckoutWidget
          productDetails={this.productDetails}
          paymentDetails={this.paymentDetails}
          tokenList={this.tokenList}
          theme={this.theme}
          type={this.type}
        >
          {({ openModal }) => (
            <button onClick={() => openModal()}>Full-screen</button>
          )}
        </CheckoutWidget>
      ),

      mountPoint
    );
  }
}

export default SuperfluidWidget;

window.customElements.get("superfluid-widget") ||
  window.customElements.define("superfluid-widget", SuperfluidWidget);
