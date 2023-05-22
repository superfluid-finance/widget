import SuperfluidWidget from "./WebComponent";

declare global {
  interface HTMLElementTagNameMap {
    "superfluid-widget": SuperfluidWidget;
  }
}

interface SuperfluidWidgetProps {
  productDetails: string;
  paymentDetails: string;
  tokenList: string;
  theme: string;
  type: "drawer" | "dialog" | "full-screen" | "page";
}
