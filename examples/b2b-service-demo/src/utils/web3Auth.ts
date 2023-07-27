import { CustomChainConfig } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Chain } from "wagmi";

import configuration from "@/configuration";

const web3AuthClientId = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID ?? "";

export const getWeb3AuthConnector = (chains: Chain[]) => {
  const chainConfig: CustomChainConfig = {
    chainNamespace: "eip155",
    chainId: "0x13881",
    rpcTarget: configuration.MumbaiRPC,
    displayName: "Polygon Mumbai",
    blockExplorer: "https://mumbai.polygonscan.io/",
    ticker: "MATIC",
    tickerName: "Polygon",
  };

  const web3auth = new Web3Auth({
    clientId: web3AuthClientId,
    web3AuthNetwork: "testnet",
    enableLogging: true,
    uiConfig: {
      appName: "b2b-service-demo,",
      loginMethodsOrder: ["github", "google", "facebook"],
      defaultLanguage: "en",
      modalZIndex: "2147483647",
    },
    chainConfig,
  });

  const web3AuthConnector = new Web3AuthConnector({
    chains,
    options: {
      web3AuthInstance: web3auth,
    },
  });

  return web3AuthConnector;
};
