"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KccscanProvider = void 0;
const ethers_1 = require("ethers");
const networks_1 = require("./networks");
const _version_1 = require("./_version");
const logger = new ethers_1.ethers.utils.Logger(_version_1.version);
const defaultApiKey = 'EVTS3CU31AATZV72YQ55TPGXGMVIFUQ9M9';
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