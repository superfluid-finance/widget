---
"@superfluid-finance/widget": patch
---

Use a default 'walletManager' with injected connector when 'walletManager' is not specified. The use-case is to ease use of the widget for developers when using for the first time, not requiring to choose wallet connecting library (RainbowKit, Web3Modal, etc) right away.
