# @superfluid-finance/widget

## 0.2.0

### Minor Changes

- 19eea2e: Re-export "@superfluid-finance/metadata" from "@superfluid-finance/widget/metadata"
- 19eea2e: Re-export "@superfluid-finance/tokenlist" from "@superflud-finance/widget/tokenlist". Remove the re-export from "@superfluid-finance/widget".

### Patch Changes

- d742691: Pass payment option's Chain with WalletManager.open()
- 81ae750: Make network asset config configurable through "networkAssets"
- d742691: Add EventListeners.onPaymentOptionUpdate callback
- ecd03dc: Update dependencies
- 6f8e126: Add Base Goerli support
- e03f8a5: Add Base network support

## 0.1.0

### Minor Changes

- 8f75760: Remove unnecessary exports (possibly breaking but unlikely) and clean-up the reference docs

### Patch Changes

- 02d58a2: Allow a single payment option to be passed in instead of a array.
- ff64818: Default to token list from '@superfluid-finance/tokenlist' when not specified
- 59f439b: Update dependencies
- 8e2f6f1: When 'type' is not specified, default to "page".
- 8e2f6f1: Use a default 'walletManager' with injected connector when 'walletManager' is not specified. The use-case is to ease use of the widget for developers when using for the first time, not requiring to choose wallet connecting library (RainbowKit, Web3Modal, etc) right away.

## 0.0.14

### Patch Changes

- ff5dda3: Update dependencies
- df7ef12: Fix issue of `wagmi` complaining about ENS Resolver when Mainnet not added to the supported chains. Before querying for ENS, check whether Mainnet is configured with an ENS Resolver.

## 0.0.13

### Patch Changes

- 0571635: Fix validation logic issue with decimals (#117)

## 0.0.12

### Patch Changes

- 2a4ce95: Fix less tokens being wrapped into Super Tokens when underlying token's decimals are not 18

## 0.0.11

### Patch Changes

- af18415: Fix underlying token balance not accounting for decimals when displaying it

## 0.0.10

### Patch Changes

- c6957f6: Reset widget when payment details change & show friendlier validation error
- 150022f: Removed all directory imports/exports, added useImmer.ts as a local file for compilation, removed transpilePackages from all next.configs as they are not necessary

## 0.0.9

### Patch Changes

- 0268d79: Fix issue of custom amount input showing up when token not selected
- 2737d18: Updated dependencies (including token list)
- 0059ef1: Add event listeners

## 0.0.8

### Patch Changes

- 34f946f: Add ability to add `userData` to payment options

## 0.0.7

### Patch Changes

- 6cf3940: Update dependencies
- c15aa92: Update Superfluid Token List

## 0.0.6

### Patch Changes

- 0ad130b: Fix flowing balance
- beee368: Improve visuals

## 0.0.5

### Patch Changes

- 5914412: Visual improvements & updated dependencies

## 0.0.4

### Patch Changes

- 03f3cf6: Fix @hookform/devtools dependency & other minor improvements
