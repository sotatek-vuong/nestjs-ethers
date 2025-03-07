"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KccscanProvider = exports.BscscanProvider = exports.sha256Pack = exports.keccak256Pack = exports.pack = exports.rlpEncode = exports.rlpDecode = exports.ContractFactory = exports.Contract = exports.BaseContract = exports.base64Encode = exports.base64Decode = exports.EthersContract = exports.EthersSigner = exports.getSignerToken = exports.getContractToken = exports.getEthersToken = exports.KUCOIN_TESTNET_NETWORK = exports.KUCOIN_NETWORK = exports.BINANCE_TESTNET_NETWORK = exports.BINANCE_NETWORK = exports.BNB_TESTNET_NETWORK = exports.BNB_NETWORK = exports.MUMBAI_NETWORK = exports.MATIC_NETWORK = exports.XDAI_NETWORK = exports.CLASSIC_KOTTI_NETWORK = exports.CLASSIC_TESTNET_NETWORK = exports.CLASSIC_MORDEN_NETWORK = exports.CLASSIC_NETWORK = exports.GOERLI_NETWORK = exports.KOVAN_NETWORK = exports.RINKEBY_NETWORK = exports.MORDEN_NETWORK = exports.UNSPECIFIED_NETWORK = exports.CLASSIC_MORDOR_NETWORK = exports.TESTNET_NETWORK = exports.ROPSTEN_NETWORK = exports.MAINNET_NETWORK = exports.InjectSignerProvider = exports.InjectContractProvider = exports.InjectEthersProvider = exports.EthersModule = void 0;
var ethers_module_1 = require("./ethers.module");
Object.defineProperty(exports, "EthersModule", { enumerable: true, get: function () { return ethers_module_1.EthersModule; } });
var ethers_decorators_1 = require("./ethers.decorators");
Object.defineProperty(exports, "InjectEthersProvider", { enumerable: true, get: function () { return ethers_decorators_1.InjectEthersProvider; } });
Object.defineProperty(exports, "InjectContractProvider", { enumerable: true, get: function () { return ethers_decorators_1.InjectContractProvider; } });
Object.defineProperty(exports, "InjectSignerProvider", { enumerable: true, get: function () { return ethers_decorators_1.InjectSignerProvider; } });
var ethers_constants_1 = require("./ethers.constants");
Object.defineProperty(exports, "MAINNET_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.MAINNET_NETWORK; } });
Object.defineProperty(exports, "ROPSTEN_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.ROPSTEN_NETWORK; } });
Object.defineProperty(exports, "TESTNET_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.TESTNET_NETWORK; } });
Object.defineProperty(exports, "CLASSIC_MORDOR_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.CLASSIC_MORDOR_NETWORK; } });
Object.defineProperty(exports, "UNSPECIFIED_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.UNSPECIFIED_NETWORK; } });
Object.defineProperty(exports, "MORDEN_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.MORDEN_NETWORK; } });
Object.defineProperty(exports, "RINKEBY_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.RINKEBY_NETWORK; } });
Object.defineProperty(exports, "KOVAN_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.KOVAN_NETWORK; } });
Object.defineProperty(exports, "GOERLI_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.GOERLI_NETWORK; } });
Object.defineProperty(exports, "CLASSIC_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.CLASSIC_NETWORK; } });
Object.defineProperty(exports, "CLASSIC_MORDEN_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.CLASSIC_MORDEN_NETWORK; } });
Object.defineProperty(exports, "CLASSIC_TESTNET_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.CLASSIC_TESTNET_NETWORK; } });
Object.defineProperty(exports, "CLASSIC_KOTTI_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.CLASSIC_KOTTI_NETWORK; } });
Object.defineProperty(exports, "XDAI_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.XDAI_NETWORK; } });
Object.defineProperty(exports, "MATIC_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.MATIC_NETWORK; } });
Object.defineProperty(exports, "MUMBAI_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.MUMBAI_NETWORK; } });
Object.defineProperty(exports, "BNB_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.BNB_NETWORK; } });
Object.defineProperty(exports, "BNB_TESTNET_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.BNB_TESTNET_NETWORK; } });
Object.defineProperty(exports, "BINANCE_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.BINANCE_NETWORK; } });
Object.defineProperty(exports, "BINANCE_TESTNET_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.BINANCE_TESTNET_NETWORK; } });
Object.defineProperty(exports, "KUCOIN_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.KUCOIN_NETWORK; } });
Object.defineProperty(exports, "KUCOIN_TESTNET_NETWORK", { enumerable: true, get: function () { return ethers_constants_1.KUCOIN_TESTNET_NETWORK; } });
var ethers_utils_1 = require("./ethers.utils");
Object.defineProperty(exports, "getEthersToken", { enumerable: true, get: function () { return ethers_utils_1.getEthersToken; } });
Object.defineProperty(exports, "getContractToken", { enumerable: true, get: function () { return ethers_utils_1.getContractToken; } });
Object.defineProperty(exports, "getSignerToken", { enumerable: true, get: function () { return ethers_utils_1.getSignerToken; } });
var ethers_signer_1 = require("./ethers.signer");
Object.defineProperty(exports, "EthersSigner", { enumerable: true, get: function () { return ethers_signer_1.EthersSigner; } });
var ethers_contract_1 = require("./ethers.contract");
Object.defineProperty(exports, "EthersContract", { enumerable: true, get: function () { return ethers_contract_1.EthersContract; } });
__exportStar(require("@ethersproject/abi"), exports);
__exportStar(require("@ethersproject/abstract-provider"), exports);
__exportStar(require("@ethersproject/abstract-signer"), exports);
__exportStar(require("@ethersproject/address"), exports);
var base64_1 = require("@ethersproject/base64");
Object.defineProperty(exports, "base64Decode", { enumerable: true, get: function () { return base64_1.decode; } });
Object.defineProperty(exports, "base64Encode", { enumerable: true, get: function () { return base64_1.encode; } });
__exportStar(require("@ethersproject/basex"), exports);
__exportStar(require("@ethersproject/bignumber"), exports);
__exportStar(require("@ethersproject/bytes"), exports);
__exportStar(require("@ethersproject/constants"), exports);
var contracts_1 = require("@ethersproject/contracts");
Object.defineProperty(exports, "BaseContract", { enumerable: true, get: function () { return contracts_1.BaseContract; } });
Object.defineProperty(exports, "Contract", { enumerable: true, get: function () { return contracts_1.Contract; } });
Object.defineProperty(exports, "ContractFactory", { enumerable: true, get: function () { return contracts_1.ContractFactory; } });
__exportStar(require("@ethersproject/hash"), exports);
__exportStar(require("@ethersproject/hdnode"), exports);
__exportStar(require("@ethersproject/json-wallets"), exports);
__exportStar(require("@ethersproject/keccak256"), exports);
__exportStar(require("@ethersproject/networks"), exports);
__exportStar(require("@ethersproject/pbkdf2"), exports);
__exportStar(require("@ethersproject/properties"), exports);
__exportStar(require("@ethersproject/providers"), exports);
__exportStar(require("@ethersproject/random"), exports);
var rlp_1 = require("@ethersproject/rlp");
Object.defineProperty(exports, "rlpDecode", { enumerable: true, get: function () { return rlp_1.decode; } });
Object.defineProperty(exports, "rlpEncode", { enumerable: true, get: function () { return rlp_1.encode; } });
__exportStar(require("@ethersproject/sha2"), exports);
__exportStar(require("@ethersproject/signing-key"), exports);
var solidity_1 = require("@ethersproject/solidity");
Object.defineProperty(exports, "pack", { enumerable: true, get: function () { return solidity_1.pack; } });
Object.defineProperty(exports, "keccak256Pack", { enumerable: true, get: function () { return solidity_1.keccak256; } });
Object.defineProperty(exports, "sha256Pack", { enumerable: true, get: function () { return solidity_1.sha256; } });
__exportStar(require("@ethersproject/strings"), exports);
__exportStar(require("@ethersproject/transactions"), exports);
__exportStar(require("@ethersproject/units"), exports);
__exportStar(require("@ethersproject/wallet"), exports);
__exportStar(require("@ethersproject/web"), exports);
__exportStar(require("@ethersproject/wordlists"), exports);
var bsc_1 = require("@ethers-ancillary/bsc");
Object.defineProperty(exports, "BscscanProvider", { enumerable: true, get: function () { return bsc_1.BscscanProvider; } });
var kcc_1 = require("./kcc");
Object.defineProperty(exports, "KccscanProvider", { enumerable: true, get: function () { return kcc_1.KccscanProvider; } });
//# sourceMappingURL=index.js.map