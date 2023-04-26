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
      >
        {() => (
          <>
            <button>Modal</button>
            <br />
            <button>Drawer</button>
          </>
        )}
      </CheckoutProvider>
    </>
  );
}

export default App;
