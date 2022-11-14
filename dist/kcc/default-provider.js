"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultProvider = void 0;
const ethers_1 = require("ethers");
const kccscan_provider_1 = require("./kccscan-provider");
function getDefaultProvider(network, config) {
    const providers = [];
    providers.push(new kccscan_provider_1.KccscanProvider(network, (config || {}).kccscan || undefined));
    return new ethers_1.ethers.providers.FallbackProvider(providers);
}
exports.getDefaultProvider = getDefaultProvider;
//# sourceMappingURL=default-provider.js.map