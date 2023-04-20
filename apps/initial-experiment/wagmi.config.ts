import { defineConfig } from "@wagmi/cli";
import { etherscan, actions, erc, react } from "@wagmi/cli/plugins";
import { Address } from "wagmi";
import { ChainId, chainIds } from "./src/networkDefinitions";
import { superTokenABI } from "./src/superTokenABI";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "SuperToken",
      abi: superTokenABI,
    },
  ],
  plugins: [
    erc({
      20: true
    }),
    react(),
    etherscan({
      apiKey: "WW2B6KB1FAXNTWP8EJQJYFTK1CMG1W4DWZ",
      chainId: 5,
      contracts: [
        {
          name: "AutoWrapManager",
          address: {
            [137]: "0x2581c27E7f6D6AF452E63fCe884EDE3EDd716b32",
            [56]: "0x2AcdD61ac1EFFe1535109449c31889bdE8d7f325",
            [5]: "0x0B82D14E9616ca4d260E77454834AdCf5887595F",
            [80001]: "0x3eAB3c6207F488E475b7955B631B564F0E6317B9",
          },
        },
        {
          name: "AutoWrapStrategy",
          address: {
            [137]: "0xb4afa36BAd8c76976Dc77a21c9Ad711EF720eE4b",
            [56]: "0x9e308cb079ae130790F604b1030cDf386670f199",
            [5]: "0xea49af829d3e28d3ec49e0e0a0ba1e7860a56f60",
            [80001]: "0x544728AFDBeEafBeC9e1329031788edb53017bC4",
          },
        },
        {
          name: "CFAv1Forwarder",
          address: chainIds.reduce((acc, value) => {
            acc[value] = "0xcfA132E353cB4E398080B9700609bb008eceB125";
            return acc;
          }, {} as Record<ChainId, Address>),
        }
      ],
    }),
    actions({
      prepareWriteContract: true,
    }),
  ],
});
