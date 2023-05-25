import { defineConfig } from "@wagmi/cli";
import { etherscan, actions, erc } from "@wagmi/cli/plugins";
import { superTokenABI } from "./src/superTokenABI";
import { Address } from "abitype";
import { ChainId, chainIds, supportedNetwork } from "./src/SupportedNetwork";

const {
  polygon,
  bsc,
  goerli,
  polygonMumbai,
  avalancheFuji,
  avalanche,
  optimism,
  arbitrum,
  mainnet,
  gnosis,
} = supportedNetwork;

export const autoWrapManagerAddresses = {
  [polygon.id]: "0x2581c27E7f6D6AF452E63fCe884EDE3EDd716b32",
  [bsc.id]: "0x2AcdD61ac1EFFe1535109449c31889bdE8d7f325",
  [goerli.id]: "0x0B82D14E9616ca4d260E77454834AdCf5887595F",
  [polygonMumbai.id]: "0x3eAB3c6207F488E475b7955B631B564F0E6317B9",
  [avalancheFuji.id]: "0x30aE282CF477E2eF28B14d0125aCEAd57Fe1d7a1",
  [avalanche.id]: "0x8082e58681350876aFe8f52d3Bf8672034A03Db0",
  [optimism.id]: "0x1fA76f2Cd0C3fe6c399A80111408d9C42C0CAC23",
  [arbitrum.id]: "0xf01825eAFAe5CD1Dab5593EFAF218efC8968D272",
  [mainnet.id]: "0x30aE282CF477E2eF28B14d0125aCEAd57Fe1d7a1",
  [gnosis.id]: "0x8082e58681350876aFe8f52d3Bf8672034A03Db0",
} as const;

export const autoWrapStrategyAddresses = {
  [polygon.id]: "0xb4afa36BAd8c76976Dc77a21c9Ad711EF720eE4b",
  [bsc.id]: "0x9e308cb079ae130790F604b1030cDf386670f199",
  [goerli.id]: "0xea49af829d3e28d3ec49e0e0a0ba1e7860a56f60",
  [polygonMumbai.id]: "0x544728AFDBeEafBeC9e1329031788edb53017bC4",
  [avalancheFuji.id]: "0x1D65c6d3AD39d454Ea8F682c49aE7744706eA96d",
  [avalanche.id]: "0x51FBAbD31A615E14b1bC12E9d887f60997264a4E",
  [optimism.id]: "0x0Cf060a501c0040e9CCC708eFE94079F501c6Bb4",
  [arbitrum.id]: "0x342076aA957B0ec8bC1d3893af719b288eA31e61",
  [mainnet.id]: "0x1D65c6d3AD39d454Ea8F682c49aE7744706eA96d",
  [gnosis.id]: "0x51FBAbD31A615E14b1bC12E9d887f60997264a4E",
} as const;

export default defineConfig({
  out: "src/wagmi-generated.ts",
  contracts: [
    {
      name: "SuperToken",
      abi: superTokenABI,
    },
  ],
  plugins: [
    erc({
      20: true,
    }),
    etherscan({
      apiKey: "WW2B6KB1FAXNTWP8EJQJYFTK1CMG1W4DWZ",
      chainId: 5,
      contracts: [
        {
          name: "AutoWrapManager",
          address: autoWrapManagerAddresses,
        },
        {
          name: "AutoWrapStrategy",
          address: autoWrapStrategyAddresses,
        },
        {
          name: "CFAv1Forwarder",
          address: chainIds.reduce((acc, value) => {
            acc[value] = "0xcfA132E353cB4E398080B9700609bb008eceB125";
            return acc;
          }, {} as Record<ChainId, Address>),
        },
      ],
    }),
    actions({
      prepareWriteContract: false,
      readContract: false,
      watchContractEvent: false,
      getContract: false,
      writeContract: false,
    }),
  ],
});
