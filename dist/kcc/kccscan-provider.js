"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KccscanProvider = void 0;
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const networks_1 = require("./networks");
const _version_1 = require("./_version");
const logger = new ethers_1.ethers.utils.Logger(_version_1.version);
const defaultApiKey = 'EVTS3CU31AATZV72YQ55TPGXGMVIFUQ9M9';
function getJsonResult(result) {
    if (result &&
        result.status == 0 &&
        result.message == 'NOTOK' &&
        (result.result || '').toLowerCase().indexOf('rate limit') >= 0) {
        const error = new Error('throttled response');
        error.result = JSON.stringify(result);
        error.throttleRetry = true;
        throw error;
    }
    if (result.jsonrpc != '2.0') {
        const error = new Error('invalid response');
        error.result = JSON.stringify(result);
        throw error;
    }
    if (result.error) {
        const error = new Error(result.error.message || 'unknown error');
        if (result.error.code) {
            error.code = result.error.code;
        }
        if (result.error.data) {
            error.data = result.error.data;
        }
        throw error;
    }
    return result.result;
}
function getResult(result) {
    var _a;
    if (result.status == 0 &&
        (result.message === 'No records found' ||
            result.message === 'No transactions found' ||
            result.message === 'No internal transactions found' ||
            (((_a = result.message) === null || _a === void 0 ? void 0 : _a.includes('No')) && result.message.includes('found')))) {
        return result.result;
    }
    if (result.status != 1 || result.message != 'OK') {
        const error = new Error('invalid response');
        error.result = JSON.stringify(result);
        if ((result.result || '').toLowerCase().indexOf('rate limit') >= 0) {
            error.throttleRetry = true;
        }
        throw error;
    }
    return result.result;
}
class KccscanProvider extends ethers_1.ethers.providers.EtherscanProvider {
    constructor(network, apiKey) {
        const standardNetwork = (0, networks_1.getNetwork)(network == null ? 'kcc-mainnet' : network);
        switch ((standardNetwork || {}).name) {
            case 'kcc-mainnet':
            case 'kcc-testnet':
                break;
            default:
                logger.throwError('unsupported network', ethers_1.ethers.utils.Logger.errors.UNSUPPORTED_OPERATION, {
                    network,
                });
        }
        super(standardNetwork, apiKey || defaultApiKey);
    }
    async fetch(module, params, post) {
        const url = post ? this.getPostUrl() : this.getUrl(module, params);
        const payload = post ? this.getPostData(module, params) : null;
        const procFunc = module === 'proxy' ? getJsonResult : getResult;
        this.emit('debug', {
            action: 'request',
            request: url,
            provider: this,
        });
        const connection = {
            url: url,
            throttleSlotInterval: 1000,
            throttleCallback: (attempt, url) => {
                if (this.isCommunityResource()) {
                    (0, providers_1.showThrottleMessage)();
                }
                return Promise.resolve(true);
            },
        };
        let payloadStr = null;
        if (payload) {
            connection.headers = { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' };
            payloadStr = Object.keys(payload)
                .map((key) => {
                return `${key}=${payload[key]}`;
            })
                .join('&');
        }
        const result = await (0, utils_1.fetchJson)(connection, payloadStr, procFunc || getJsonResult);
        this.emit('debug', {
            action: 'response',
            request: url,
            response: (0, utils_1.deepCopy)(result),
            provider: this,
        });
        return result;
    }
    getBaseUrl() {
        switch (this.network ? this.network.name : 'invalid') {
            case 'kcc-mainnet':
                return 'https://scan.kcc.io';
            case 'kcc-testnet':
                return 'https://scan-testnet.kcc.network';
        }
        return logger.throwArgumentError('unsupported network', 'network', this.network);
    }
    isCommunityResource() {
        return this.apiKey === defaultApiKey;
    }
}
exports.KccscanProvider = KccscanProvider;
//# sourceMappingURL=kccscan-provider.js.map