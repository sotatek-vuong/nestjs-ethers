"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSignerProvider = exports.createContractProvider = exports.createAsyncOptionsProvider = exports.createEthersAsyncProvider = exports.createEthersProvider = exports.createBaseProvider = void 0;
const bsc_1 = require("@ethers-ancillary/bsc");
const providers_1 = require("@ethersproject/providers");
const rxjs_1 = require("rxjs");
const ethers_constants_1 = require("./ethers.constants");
const ethers_contract_1 = require("./ethers.contract");
const ethers_signer_1 = require("./ethers.signer");
const ethers_utils_1 = require("./ethers.utils");
function validateBscNetwork(network) {
    if (typeof network === 'number') {
        return [ethers_constants_1.BINANCE_NETWORK.chainId, ethers_constants_1.BINANCE_TESTNET_NETWORK.chainId].includes(network);
    }
    if (typeof network === 'string') {
        return [ethers_constants_1.BINANCE_NETWORK.name, ethers_constants_1.BINANCE_TESTNET_NETWORK.name].includes(network);
    }
    return [ethers_constants_1.BINANCE_NETWORK, ethers_constants_1.BINANCE_TESTNET_NETWORK].includes(network);
}
async function createBaseProvider(options) {
    var _a;
    const { network = ethers_constants_1.MAINNET_NETWORK, alchemy, etherscan, infura, pocket, cloudflare = false, bscscan, custom, quorum = 1, waitUntilIsConnected = true, useDefaultProvider = true, } = options;
    let providerNetwork;
    const isBscNetwork = validateBscNetwork(network);
    if (isBscNetwork) {
        providerNetwork = (_a = (0, bsc_1.getNetwork)(network)) !== null && _a !== void 0 ? _a : undefined;
    }
    else {
        providerNetwork = (0, providers_1.getNetwork)(network);
    }
    if (!providerNetwork) {
        throw new Error(`Invalid network ${network}.`);
    }
    if (!useDefaultProvider) {
        const providers = [];
        if (alchemy) {
            providers.push(new providers_1.AlchemyProvider(providerNetwork, alchemy));
        }
        if (etherscan) {
            providers.push(new providers_1.EtherscanProvider(providerNetwork, etherscan));
        }
        if (infura) {
            providers.push(new providers_1.InfuraProvider(providerNetwork, infura));
        }
        if (pocket) {
            providers.push(new providers_1.PocketProvider(providerNetwork, pocket));
        }
        if (cloudflare) {
            if (providerNetwork.chainId !== ethers_constants_1.MAINNET_NETWORK.chainId) {
                throw new Error(`Invalid network. Cloudflare only supports ${ethers_constants_1.MAINNET_NETWORK.name}.`);
            }
            providers.push(new providers_1.CloudflareProvider(providerNetwork));
        }
        if (bscscan) {
            providers.push(new bsc_1.BscscanProvider(providerNetwork, bscscan));
        }
        if (custom) {
            const customInfos = !Array.isArray(custom) ? [custom] : custom;
            customInfos.forEach((customInfo) => {
                providers.push(new providers_1.StaticJsonRpcProvider(customInfo, providerNetwork));
            });
        }
        if (providers.length > 0) {
            if (waitUntilIsConnected) {
                await Promise.all(providers.map((provider) => provider.ready));
            }
            if (providers.length > 1) {
                return new providers_1.FallbackProvider(providers, quorum);
            }
            return providers[0];
        }
        throw new Error('Error in provider creation. The property "useDefaultProvider" is false and the providers supplied are invalid.');
    }
    if (useDefaultProvider && isBscNetwork) {
        const bscConfig = bscscan ? { bscscan } : {};
        return (0, bsc_1.getDefaultProvider)(providerNetwork, bscConfig);
    }
    return (0, providers_1.getDefaultProvider)(providerNetwork, {
        alchemy,
        etherscan,
        infura,
        pocket,
        quorum,
    });
}
exports.createBaseProvider = createBaseProvider;
function createEthersProvider(options) {
    return {
        provide: (0, ethers_utils_1.getEthersToken)(options.token),
        useFactory: async () => {
            return (await (0, rxjs_1.defer)(() => createBaseProvider(options)).toPromise());
        },
    };
}
exports.createEthersProvider = createEthersProvider;
function createEthersAsyncProvider(token) {
    return {
        provide: (0, ethers_utils_1.getEthersToken)(token),
        useFactory: async (options) => {
            return (await (0, rxjs_1.defer)(() => createBaseProvider(options)).toPromise());
        },
        inject: [ethers_constants_1.ETHERS_MODULE_OPTIONS],
    };
}
exports.createEthersAsyncProvider = createEthersAsyncProvider;
function createAsyncOptionsProvider(options) {
    return {
        provide: ethers_constants_1.ETHERS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
    };
}
exports.createAsyncOptionsProvider = createAsyncOptionsProvider;
function createContractProvider(token) {
    return {
        provide: (0, ethers_utils_1.getContractToken)(token),
        useFactory: async (provider) => {
            return (await (0, rxjs_1.defer)(async () => new ethers_contract_1.EthersContract(provider)).toPromise());
        },
        inject: [(0, ethers_utils_1.getEthersToken)(token)],
    };
}
exports.createContractProvider = createContractProvider;
function createSignerProvider(token) {
    return {
        provide: (0, ethers_utils_1.getSignerToken)(token),
        useFactory: async (provider) => {
            return (await (0, rxjs_1.defer)(async () => new ethers_signer_1.EthersSigner(provider)).toPromise());
        },
        inject: [(0, ethers_utils_1.getEthersToken)(token)],
    };
}
exports.createSignerProvider = createSignerProvider;
//# sourceMappingURL=ethers.providers.js.map