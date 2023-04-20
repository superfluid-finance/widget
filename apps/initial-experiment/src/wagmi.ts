import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createClient } from 'wagmi'
import * as wagmiChainDefinitions from 'wagmi/chains'
import { chainIds } from './networkDefinitions'
import findOrThrow from './findOrThrow'

export const walletConnectProjectId = '952483bf7a0f5ace4c40eb53967f1368'

const wagmiChains = Object.values(wagmiChainDefinitions); 

const { chains, provider, webSocketProvider } = configureChains(
  chainIds.map(chainId => findOrThrow(wagmiChains, chain => chain.id === chainId)),
  [w3mProvider({ projectId: walletConnectProjectId })],
)

export const client = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
    version: 1,
  }),
  provider,
  webSocketProvider,
})

export { chains }