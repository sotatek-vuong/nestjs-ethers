import { ethers } from 'ethers'

import { KccscanProvider } from './kccscan-provider'

export function getDefaultProvider(
  network?: ethers.providers.Networkish,
  config?: Record<string, string>,
): ethers.providers.Provider {
  const providers: Array<ethers.providers.Provider> = []

  providers.push(new KccscanProvider(network, (config || {}).kccscan || undefined))

  return new ethers.providers.FallbackProvider(providers)
}
