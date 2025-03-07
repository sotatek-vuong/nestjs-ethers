/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  BscscanProvider,
  getDefaultProvider as getDefaultBscProvider,
  getNetwork as getBscNetwork,
} from '@ethers-ancillary/bsc'
import { KccscanProvider, getDefaultProvider as getDefaultKccProvider, getNetwork as getKccNetwork } from './kcc'
import {
  Provider as AbstractProvider,
  BaseProvider,
  getDefaultProvider,
  FallbackProvider,
  AlchemyProvider,
  CloudflareProvider,
  EtherscanProvider,
  InfuraProvider,
  PocketProvider,
  getNetwork,
  Networkish,
  Network,
  StaticJsonRpcProvider,
} from '@ethersproject/providers'
import { Provider } from '@nestjs/common'
import { ConnectionInfo } from 'ethers/lib/utils'
import { defer } from 'rxjs'
import {
  ETHERS_MODULE_OPTIONS,
  MAINNET_NETWORK,
  BINANCE_NETWORK,
  BINANCE_TESTNET_NETWORK,
  KUCOIN_NETWORK,
  KUCOIN_TESTNET_NETWORK,
} from './ethers.constants'
import { EthersContract } from './ethers.contract'
import { EthersModuleOptions, EthersModuleAsyncOptions } from './ethers.interface'
import { EthersSigner } from './ethers.signer'
import { getEthersToken, getContractToken, getSignerToken } from './ethers.utils'

function validateBscNetwork(network: Networkish) {
  if (typeof network === 'number') {
    return [BINANCE_NETWORK.chainId, BINANCE_TESTNET_NETWORK.chainId].includes(network)
  }

  if (typeof network === 'string') {
    return [BINANCE_NETWORK.name, BINANCE_TESTNET_NETWORK.name].includes(network)
  }

  return [BINANCE_NETWORK, BINANCE_TESTNET_NETWORK].includes(network)
}

function validateKccNetwork(network: Networkish) {
  if (typeof network === 'number') {
    return [KUCOIN_NETWORK.chainId, KUCOIN_TESTNET_NETWORK.chainId].includes(network)
  }

  if (typeof network === 'string') {
    return [KUCOIN_NETWORK.name, KUCOIN_TESTNET_NETWORK.name].includes(network)
  }

  return [KUCOIN_NETWORK, KUCOIN_TESTNET_NETWORK].includes(network)
}

export async function createBaseProvider(options: EthersModuleOptions): Promise<BaseProvider | AbstractProvider> {
  const {
    network = MAINNET_NETWORK,
    alchemy,
    etherscan,
    infura,
    pocket,
    cloudflare = false,
    bscscan,
    custom,
    kccscan,
    quorum = 1,
    waitUntilIsConnected = true,
    useDefaultProvider = true,
  } = options

  let providerNetwork: Network | undefined
  const isBscNetwork = validateBscNetwork(network)
  const isKccNetwork = !isBscNetwork && validateKccNetwork(network)

  if (isBscNetwork) {
    providerNetwork = getBscNetwork(network) ?? undefined
  } else if (isKccNetwork) {
    providerNetwork = getKccNetwork(network) ?? undefined
  } else {
    providerNetwork = getNetwork(network)
  }

  if (!providerNetwork) {
    throw new Error(`Invalid network ${network}.`)
  }

  if (!useDefaultProvider) {
    const providers: Array<BaseProvider> = []

    if (alchemy) {
      providers.push(new AlchemyProvider(providerNetwork, alchemy))
    }

    if (etherscan) {
      providers.push(new EtherscanProvider(providerNetwork, etherscan))
    }

    if (infura) {
      providers.push(new InfuraProvider(providerNetwork, infura))
    }

    if (pocket) {
      providers.push(new PocketProvider(providerNetwork, pocket))
    }

    if (cloudflare) {
      if (providerNetwork.chainId !== MAINNET_NETWORK.chainId) {
        throw new Error(`Invalid network. Cloudflare only supports ${MAINNET_NETWORK.name}.`)
      }

      providers.push(new CloudflareProvider(providerNetwork))
    }

    if (bscscan) {
      providers.push(new BscscanProvider(providerNetwork, bscscan))
    }

    if (kccscan) {
      providers.push(new KccscanProvider(providerNetwork, kccscan))
    }

    if (custom) {
      const customInfos: (ConnectionInfo | string)[] = !Array.isArray(custom) ? [custom] : custom

      customInfos.forEach((customInfo) => {
        providers.push(new StaticJsonRpcProvider(customInfo, providerNetwork))
      })
    }

    if (providers.length > 0) {
      if (waitUntilIsConnected) {
        // wait until the node is up and running smoothly.
        await Promise.all(providers.map((provider) => provider.ready))
      }

      if (providers.length > 1) {
        /**
         * FallbackProvider with selected providers.
         * @see {@link https://docs.ethers.io/v5/api/providers/other/#FallbackProvider}
         */
        return new FallbackProvider(providers, quorum)
      }

      return providers[0]
    }

    throw new Error(
      'Error in provider creation. The property "useDefaultProvider" is false and the providers supplied are invalid.',
    )
  }

  if (useDefaultProvider) {
    if (isBscNetwork) {
      const bscConfig: Record<string, string> = bscscan ? { bscscan } : {}

      return getDefaultBscProvider(providerNetwork, bscConfig)
    } else if (isKccNetwork) {
      const kccConfig: Record<string, string> = kccscan ? { kccscan } : {}

      return getDefaultKccProvider(providerNetwork, kccConfig)
    }
  }

  /**
   * The default provider is the safest, easiest way to begin developing on Ethereum
   * It creates a FallbackProvider connected to as many backend services as possible.
   * @see {@link https://docs.ethers.io/v5/api/providers/#providers-getDefaultProvider}
   */
  return getDefaultProvider(providerNetwork, {
    alchemy,
    etherscan,
    infura,
    pocket,
    quorum,
  })
}

export function createEthersProvider(options: EthersModuleOptions): Provider {
  return {
    provide: getEthersToken(options.token),
    useFactory: async (): Promise<BaseProvider | AbstractProvider> => {
      return (await defer(() => createBaseProvider(options)).toPromise())!
    },
  }
}

export function createEthersAsyncProvider(token?: string): Provider {
  return {
    provide: getEthersToken(token),
    useFactory: async (options: EthersModuleOptions): Promise<BaseProvider | AbstractProvider> => {
      return (await defer(() => createBaseProvider(options)).toPromise())!
    },
    inject: [ETHERS_MODULE_OPTIONS],
  }
}

export function createAsyncOptionsProvider(options: EthersModuleAsyncOptions): Provider {
  return {
    provide: ETHERS_MODULE_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject || [],
  }
}

export function createContractProvider(token?: string): Provider {
  return {
    provide: getContractToken(token),
    useFactory: async (provider: AbstractProvider): Promise<EthersContract> => {
      return (await defer(async () => new EthersContract(provider)).toPromise())!
    },
    inject: [getEthersToken(token)],
  }
}

export function createSignerProvider(token?: string): Provider {
  return {
    provide: getSignerToken(token),
    useFactory: async (provider: AbstractProvider): Promise<EthersSigner> => {
      return (await defer(async () => new EthersSigner(provider)).toPromise())!
    },
    inject: [getEthersToken(token)],
  }
}
