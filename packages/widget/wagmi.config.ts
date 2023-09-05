import constantFlowAgreementV1JSON from "@superfluid-finance/ethereum-contracts/artifacts/contracts/agreements/ConstantFlowAgreementV1.sol/ConstantFlowAgreementV1.json" assert { type: "json" };
import superfluidGovernanceJSON from "@superfluid-finance/ethereum-contracts/artifacts/contracts/gov/SuperfluidGovernanceII.sol/SuperfluidGovernanceII.json" assert { type: "json" };
import superfluidHostJSON from "@superfluid-finance/ethereum-contracts/artifacts/contracts/superfluid/Superfluid.sol/Superfluid.json" assert { type: "json" };
import superTokenJSON from "@superfluid-finance/ethereum-contracts/artifacts/contracts/superfluid/SuperToken.sol/SuperToken.json" assert { type: "json" };
import pureSuperTokenJSON from "@superfluid-finance/ethereum-contracts/artifacts/contracts/tokens/PureSuperToken.sol/PureSuperToken.json" assert { type: "json" };
import nativeAssetSuperTokenJSON from "@superfluid-finance/ethereum-contracts/artifacts/contracts/tokens/SETH.sol/SETHProxy.json" assert { type: "json" };
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
      name: "Constant Flow Agreement V1",
      abi: constantFlowAgreementV1JSON.abi as Abi,
      address: superfluidMetadata.networks.reduce(
        (acc, network) => {
          acc[network.chainId] = network.contractsV1.cfaV1 as `0x${string}`;
          return acc;
        },
        {} as Record<number, Address>,
      ),
    },
    {
      name: "SuperfluidHost",
      abi: superfluidHostJSON.abi as Abi,
      address: superfluidMetadata.networks.reduce(
        (acc, network) => {
          acc[network.chainId] = network.contractsV1.host as `0x${string}`;
          return acc;
        },
        {} as Record<number, Address>,
      ),
    },
    {
      name: "SuperfluidGovernance",
      abi: superfluidGovernanceJSON.abi as Abi,
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
      chainId: 80001,
      contracts: [
        {
          name: "SuperUpgrader",
          address: "0x80a18e53a1761cba151af445640c06046f0b62a5",
        },
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
