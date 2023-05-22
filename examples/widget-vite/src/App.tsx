import "./App.css";
import { CheckoutWidget } from "@superfluid-finance/widget";
import productDetails from "./productDetails";
import paymentDetails from "./paymentDetails";
import tokenList from "./tokenList";

function App() {
  return (
    <>
      <CheckoutWidget
        productDetails={productDetails}
        paymentDetails={paymentDetails}
        tokenList={tokenList}
        type="drawer"
      >
        {({ openModal }) => <button onClick={() => openModal()}>Drawer</button>}
      </CheckoutWidget>
      <CheckoutWidget
        productDetails={productDetails}
        paymentDetails={paymentDetails}
        tokenList={tokenList}
        type="dialog"
      >
        {({ openModal }) => <button onClick={() => openModal()}>Dialog</button>}
      </CheckoutWidget>
      <CheckoutWidget
        productDetails={productDetails}
        paymentDetails={paymentDetails}
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
