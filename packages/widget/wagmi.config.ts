import { defineConfig } from "@wagmi/cli";
import { etherscan, actions, erc } from "@wagmi/cli/plugins";
import { Abi, Address } from "viem";
import {
  ChainId,
  chainIds,
  supportedNetwork,
} from "./src/core/SupportedNetwork";
import nativeAssetSuperTokenJSON from "@superfluid-finance/ethereum-contracts/artifacts/contracts/tokens/SETH.sol/SETHProxy.json" assert { type: "json" };
import pureSuperTokenJSON from "@superfluid-finance/ethereum-contracts/artifacts/contracts/tokens/PureSuperToken.sol/PureSuperToken.json" assert { type: "json" };
import superTokenJSON from "@superfluid-finance/ethereum-contracts/artifacts/contracts/superfluid/SuperToken.sol/SuperToken.json" assert { type: "json" };
import superfluidGovernanceJSON from "@superfluid-finance/ethereum-contracts/artifacts/contracts/gov/SuperfluidGovernanceII.sol/SuperfluidGovernanceII.json" assert { type: "json" };
import cfaV1ForwarderABI_modified from "./src/core/cfaV1ForwarderABI_modified";
import superfluidMetadata from "@superfluid-finance/metadata";

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
  out: "./src/core/wagmi-generated.ts",
  contracts: [
    {
      name: "Super Token",
      abi: superTokenJSON.abi as Abi,
    },
    {
      name: "Native Asset Super Token",
      abi: nativeAssetSuperTokenJSON.abi as Abi,
    },
    {
      name: "Pure Super Token",
      abi: pureSuperTokenJSON.abi as Abi,
    },
    {
      name: "CFAv1Forwarder",
      abi: cfaV1ForwarderABI_modified,
      address: chainIds.reduce(
        (acc, chainId) => {
          acc[chainId] = "0xcfA132E353cB4E398080B9700609bb008eceB125";
          return acc;
        },
        {} as Record<ChainId, Address>,
      ),
    },
    {
      name: "SuperfluidGovernance",
      abi: superfluidGovernanceJSON.abi as Abi,
      address: superfluidMetadata.networks.reduce(
        (acc, network) => {
          acc[network.chainId] = network.contractsV1.governance;
          return acc;
        },
        {} as Record<ChainId, Address>,
      ),
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
