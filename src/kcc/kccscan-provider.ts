import { ethers } from 'ethers'

import { getNetwork } from './networks'

import { version } from './_version'
const logger = new ethers.utils.Logger(version)

const defaultApiKey = 'EVTS3CU31AATZV72YQ55TPGXGMVIFUQ9M9'

export class KccscanProvider extends ethers.providers.EtherscanProvider {
  constructor(network?: ethers.providers.Networkish, apiKey?: string) {
    const standardNetwork = getNetwork(network == null ? 'kcc-mainnet' : network)

    switch ((standardNetwork || {}).name) {
      case 'kcc-mainnet':
      case 'kcc-testnet':
        break
      default:
        logger.throwError('unsupported network', ethers.utils.Logger.errors.UNSUPPORTED_OPERATION, {
          network,
        })
    }

    super(<ethers.providers.Network>standardNetwork, apiKey || defaultApiKey)
  }

  getBaseUrl(): string {
    switch (this.network ? this.network.name : 'invalid') {
      case 'kcc-mainnet':
        return 'https://scan.kcc.io'
      case 'kcc-testnet':
        return 'https://scan-testnet.kcc.network'
    }

    return logger.throwArgumentError('unsupported network', 'network', this.network)
  }

  isCommunityResource(): boolean {
    return this.apiKey === defaultApiKey
  }
}
