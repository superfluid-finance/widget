---
"@superfluid-finance/widget": patch
---

Fix issue of `wagmi` complaining about ENS Resolver when Mainnet not added to the supported chains. Before querying for ENS, check whether Mainnet is configured with an ENS Resolver.