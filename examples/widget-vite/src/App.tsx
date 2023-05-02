import "./App.css";
import { CheckoutProvider } from "superfluid-checkout-widget";
import productDetails from "./productDetails";
import paymentOptions from "./paymentOptions";
import tokenList from "./tokenList";

function App() {
  return (
    <>
      <CheckoutProvider
        productDetails={productDetails}
        paymentOptions={paymentOptions}
        tokenList={tokenList}
        type="drawer"
      >
        {({ openModal }) => <button onClick={() => openModal()}>Drawer</button>}
      </CheckoutProvider>
      <CheckoutProvider
        productDetails={productDetails}
        paymentOptions={paymentOptions}
        tokenList={tokenList}
        type="dialog"
      >
        {({ openModal }) => <button onClick={() => openModal()}>Dialog</button>}
      </CheckoutProvider>
      <CheckoutProvider
        productDetails={productDetails}
        paymentOptions={paymentOptions}
        tokenList={tokenList}
        type="full-screen"
      >
        {({ openModal }) => (
          <button onClick={() => openModal()}>Full-screen</button>
        )}
      </CheckoutProvider>
    </>
  );
}

export default App;
