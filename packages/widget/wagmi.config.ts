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
      chainId: 5,
      contracts: [
        {
          name: "SuperUpgrader",
          address: {
            80001: "0xb7db015aa9f37142340c94f09c543ad51b53e961",
            5: "0xAEf1F1Ee5b5652560f305e9c0278d137a6AB5e9C",
          },
        },
        {
          name: "PermitUnderlying",
          address: {
            80001: "0x60974a03baaa984ea79f4590ac1e88aaae31158a",
            5: "0xc3cA859682786B0f97Fa9c1239C249cbBb20cDaC",
          },
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
