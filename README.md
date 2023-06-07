# Superfluid Widget &middot; ![npm version](https://badge.fury.io/js/%40superfluid-finance%2Fwidget.svg) ![License: MIT](https://img.shields.io/badge/License-MIT-green.svg) [![Twitter Follow](https://img.shields.io/twitter/follow/Superfluid_HQ?style=social)](https://twitter.com/Superfluid_HQ)

Superfluid Widget is the best way to start receiving ongoing real-time payments powered by the Superfluid Protocol. This React widget library is designed to provide an easy-to-use, customizable, and versatile payment solution that can be integrated into your application in a matter of minutes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install the Superfluid Widget using your favorite package manager. Please note that `wagmi` is a required peer dependency.

### NPM

```sh
npm install --save @superfluid-finance/widget wagmi viem
```

### Yarn

```sh
yarn add @superfluid-finance/widget wagmi viem
```

### PNPM

```sh
pnpm add @superfluid-finance/widget wagmi viem
```

## Usage

To use the Superfluid Widget in your React application, you need to follow these simple steps:

1. Import the necessary components and dependencies.

```tsx
import { WagmiConfig } from "wagmi";
import SuperfluidWidget from "@superfluid-finance/widget";
```

2. Wrap your application with `WagmiConfig` and include the `CheckoutWidget` component.

```tsx
<WagmiConfig config={wagmiConfig}>
  <SuperfluidWidget
    productDetails={productDetails}
    paymentDetails={paymentDetails}
    tokenList={tokenList}
    type="dialog"
    walletManager={walletManager}
  >
    {({ openModal }) => (
      <button onClick={() => openModal()}>Open Superfluid Widget</button>
    )}
  </SuperfluidWidget>
</WagmiConfig>
```

Now your users can start making real-time payments using the Superfluid Widget!

## Examples

You can find examples of various use cases in the `examples` folder of this repository. We encourage you to explore them and adapt them to your specific application's requirements.

## Customization

Superfluid Widget can be easily customized to fit your application's look and feel. The widget is built using MUI, so you can customize its appearance by passing the `theme` object to the `WagmiConfig` component. You can reference the [default Material-UI theme](https://mui.com/material-ui/customization/default-theme/) for available customization options.

```tsx
import { createMuiTheme } from "@material-ui/core/styles";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff9800",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

<SuperfluidWidget theme={customTheme}>{/* ... */}</SuperfluidWidget>;
```

## Contributing

We welcome all sorts of contributions, be it bug fixes, new features or documentation improvements. If you'd like to contribute, please follow these basic guidelines:

1. Fork this repository and clone it to your local machine
2. Create a new branch for your changes
3. Make your changes and push them to your fork
4. Create a pull request from your fork's branch to the original repository's master branch

## License

The Superfluid Widget library is [MIT licensed](./LICENSE).
