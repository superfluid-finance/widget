# Superfluid Widget

Superfluid Widget is the best way to start receiving ongoing real-time payments powered by the Supefluid Protocol.

## Installation

```tsx
<WagmiConfig config={wagmiConfig}>
  <CheckoutWidget
    productDetails={productDetails}
    paymentDetails={paymentDetails}
    tokenList={tokenList}
    type="dialog"
    walletManager={walletManager}
  >
    {({ openModal }) => (
      <button onClick={() => openModal()}>Open Superfluid Widget</button>
    )}
  </CheckoutWidget>
</WagmiConfig>
```

## Getting Started
