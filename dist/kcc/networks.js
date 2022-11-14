"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetwork = void 0;
const ethers_1 = require("ethers");
const _version_1 = require("./_version");
const logger = new ethers_1.ethers.utils.Logger(_version_1.version);
const networks = [
    {
        name: 'kcc-mainnet',
        chainId: 0x141,
    },
    {
        name: 'kcc-testnet',
        chainId: 0x142,
    },
];
function getNetwork(network) {
    if (network == null) {
        return null;
    }
    if (typeof network === 'number') {
        const matches = networks.filter((n) => n.chainId === network);
        if (matches.length) {
            return { name: matches[0].name, chainId: matches[0].chainId };
        }
        return {
            name: 'unknown',
            chainId: network,
        };
    }
    if (typeof network === 'string') {
        const matches = networks.filter((n) => n.name === network);
        if (matches.length) {
            return { name: matches[0].name, chainId: matches[0].chainId };
        }
        return null;
    }
    if (typeof network.name === 'string' && typeof network.chainId === 'number') {
        const byName = getNetwork(network.name);
        const byChainId = getNetwork(network.chainId);
        if (byName == null && byChainId == null) {
            return {
                name: network.name,
                chainId: network.chainId,
            };
        }
        if (byName && byChainId && byName.name === byChainId.name && byName.chainId === byChainId.chainId) {
            return byName;
        }
    }
    return logger.throwArgumentError('network chainId mismatch', 'network', network);
}
exports.getNetwork = getNetwork;
//# sourceMappingURL=networks.js.map