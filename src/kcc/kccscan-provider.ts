import { showThrottleMessage } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { ConnectionInfo, deepCopy, fetchJson } from 'ethers/lib/utils'

import { getNetwork } from './networks'

import { version } from './_version'
const logger = new ethers.utils.Logger(version)

const defaultApiKey = 'EVTS3CU31AATZV72YQ55TPGXGMVIFUQ9M9'

function getJsonResult(result: {
  jsonrpc: string
  result?: any
  error?: { code?: number; data?: any; message?: string }
}): any {
  // This response indicates we are being throttled
  if (
    result &&
    (<any>result).status == 0 &&
    (<any>result).message == 'NOTOK' &&
    (result.result || '').toLowerCase().indexOf('rate limit') >= 0
  ) {
    const error: any = new Error('throttled response')
    error.result = JSON.stringify(result)
    error.throttleRetry = true
    throw error
  }

  if (result.jsonrpc != '2.0') {
    // @TODO: not any
    const error: any = new Error('invalid response')
    error.result = JSON.stringify(result)
    throw error
  }

  if (result.error) {
    // @TODO: not any
    const error: any = new Error(result.error.message || 'unknown error')
    if (result.error.code) {
      error.code = result.error.code
    }
    if (result.error.data) {
      error.data = result.error.data
    }
    throw error
  }

  return result.result
}

function getResult(result: { status?: number; message?: string; result?: any }): any {
  // getLogs, getHistory have weird success responses
  if (
    result.status == 0 &&
    (result.message === 'No records found' ||
      result.message === 'No transactions found' ||
      result.message === 'No internal transactions found' ||
      (result.message?.includes('No') && result.message.includes('found')))
  ) {
    return result.result
  }

  if (result.status != 1 || result.message != 'OK') {
    const error: any = new Error('invalid response')
    error.result = JSON.stringify(result)
    if ((result.result || '').toLowerCase().indexOf('rate limit') >= 0) {
      error.throttleRetry = true
    }
    throw error
  }

  return result.result
}

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
  async fetch(module: string, params: Record<string, any>, post?: boolean | undefined): Promise<any> {
    const url = post ? this.getPostUrl() : this.getUrl(module, params)
    const payload = post ? this.getPostData(module, params) : null
    const procFunc = module === 'proxy' ? getJsonResult : getResult

    this.emit('debug', {
      action: 'request',
      request: url,
      provider: this,
    })

    const connection: ConnectionInfo = {
      url: url,
      throttleSlotInterval: 1000,
      throttleCallback: (attempt: number, url: string) => {
        if (this.isCommunityResource()) {
          showThrottleMessage()
        }
        return Promise.resolve(true)
      },
    }

    // @ts-ignore
    let payloadStr: string = null
    if (payload) {
      connection.headers = { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      payloadStr = Object.keys(payload)
        .map((key) => {
          return `${key}=${payload[key]}`
        })
        .join('&')
    }

    const result = await fetchJson(connection, payloadStr, procFunc || getJsonResult)

    this.emit('debug', {
      action: 'response',
      request: url,
      response: deepCopy(result),
      provider: this,
    })

    return result
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
