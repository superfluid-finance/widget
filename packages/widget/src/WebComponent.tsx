import { createRoot } from "react-dom/client";
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
  trigger!: string;

  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);

    const productDetails = this.getAttribute("productDetails");
    const paymentDetails = this.getAttribute("paymentDetails");
    const tokenList = this.getAttribute("tokenList");
    const theme = this.getAttribute("theme");
    const type = this.getAttribute("type");
    const trigger = this.getAttribute("trigger");

    if (
      !(
        productDetails &&
        paymentDetails &&
        tokenList &&
        theme &&
        type &&
        trigger
      )
    ) {
      throw new Error(
        `Missing required attributes ${JSON.stringify({
          productDetails,
          paymentDetails,
          tokenList,
          theme,
          type,
          trigger,
        })}`
      );
    } else {
      this.productDetails = JSON.parse(productDetails);
      this.paymentDetails = JSON.parse(paymentDetails);
      this.tokenList = JSON.parse(tokenList);
      this.theme = JSON.parse(theme);
      this.type = type as typeof this.type;
      this.trigger = trigger;
    }

    createRoot(mountPoint).render(
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
          {({ openModal }) => {
            const target = document.querySelector<HTMLButtonElement>(
              this.trigger
            );

            if (target) {
              target.onclick = openModal;
              return <></>;
            }

            return <button onClick={() => openModal()}>Open</button>;
          }}
        </CheckoutWidget>
      )
    );
  }
}

export default SuperfluidWidget;

window.customElements.get("superfluid-widget") ||
  window.customElements.define("superfluid-widget", SuperfluidWidget);
