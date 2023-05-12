import "./App.css";
import { CheckoutWidget } from "superfluid-checkout-widget";
import productDetails from "./productDetails";
import paymentOptions from "./paymentOptions";
import tokenList from "./tokenList";

function App() {
  return (
    <>
      <CheckoutWidget
        productDetails={productDetails}
        paymentOptions={paymentOptions}
        tokenList={tokenList}
        type="drawer"
      >
        {({ openModal }) => <button onClick={() => openModal()}>Drawer</button>}
      </CheckoutWidget>
      <CheckoutWidget
        productDetails={productDetails}
        paymentOptions={paymentOptions}
        tokenList={tokenList}
        type="dialog"
      >
        {({ openModal }) => <button onClick={() => openModal()}>Dialog</button>}
      </CheckoutWidget>
      <CheckoutWidget
        productDetails={productDetails}
        paymentOptions={paymentOptions}
        tokenList={tokenList}
        type="full-screen"
      >
        {({ openModal }) => (
          <button onClick={() => openModal()}>Full-screen</button>
        )}
      </CheckoutWidget>
    </>
  );
}

export default App;
