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
        modal="drawer"
      >
        {({ modal: { openModal } }) => (
          <button onClick={() => openModal()}>Drawer</button>
        )}
      </CheckoutProvider>
      <CheckoutProvider
        productDetails={productDetails}
        paymentOptions={paymentOptions}
        tokenList={tokenList}
        modal="dialog"
      >
        {({ modal }) => (
          <button onClick={() => modal.openModal()}>Dialog</button>
        )}
      </CheckoutProvider>
    </>
  );
}

export default App;
