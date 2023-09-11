import bundledAbi from "@superfluid-finance/ethereum-contracts/build/bundled-abi.json" assert { type: "json" };
import superfluidMetadata from "@superfluid-finance/metadata";
import { defineConfig } from "@wagmi/cli";
import { actions, erc, etherscan } from "@wagmi/cli/plugins";
import { Abi, Address } from "viem";

import {
  autoWrapManagerAddress,
  autoWrapStrategyAddress,
  cfAv1ForwarderAddress,
} from "./src/core/wagmi-generated";

export default defineConfig({
  out: "./src/core/wagmi-generated.ts",
  contracts: [
    {
      name: "SuperfluidErrors",
      abi: (bundledAbi.ConstantFlowAgreementV1 as Abi)
        .concat(bundledAbi.SuperToken as Abi)
        .filter((x) => x.type === "error"),
    },
    {
      name: "Super Token",
      abi: bundledAbi.SuperToken as Abi,
    },
    {
      name: "Native Asset Super Token",
      abi: bundledAbi.ISETH as Abi,
    },
    {
      name: "Pure Super Token",
      abi: bundledAbi.IPureSuperToken as Abi,
    },
    {
      name: "SuperfluidGovernance",
      abi: bundledAbi.SuperfluidGovernanceII as Abi,
      address: superfluidMetadata.networks.reduce(
        (acc, network) => {
          acc[network.chainId] = network.contractsV1
            .governance as `0x${string}`;
          return acc;
        },
        {} as Record<number, Address>,
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
          name: "CFAv1Forwarder",
          address: superfluidMetadata.networks.reduce(
            (acc, network) => {
              acc[network.chainId] = network.contractsV1
                .cfaV1Forwarder as Address;
              return acc;
            },
            {} as Record<keyof typeof cfAv1ForwarderAddress, Address>,
          ),
        },
        {
          name: "AutoWrapManager",
          address: superfluidMetadata.networks.reduce(
            (acc, network) => {
              const address = network.contractsV1.autowrap?.manager as
                | Address
                | undefined;
              if (address) {
                acc[network.chainId] = address;
              }
              return acc;
            },
            {} as Record<keyof typeof autoWrapManagerAddress, Address>,
          ),
        },
        {
          name: "AutoWrapStrategy",
          address: superfluidMetadata.networks.reduce(
            (acc, network) => {
              const address = network.contractsV1.autowrap?.wrapStrategy as
                | Address
                | undefined;
              if (address) {
                acc[network.chainId] = address;
              }
              return acc;
            },
            {} as Record<keyof typeof autoWrapStrategyAddress, Address>,
          ),
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
