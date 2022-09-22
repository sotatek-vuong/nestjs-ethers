"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignerToken = exports.getContractToken = exports.getEthersToken = void 0;
const ethers_constants_1 = require("./ethers.constants");
function getEthersToken(token) {
    return `${ethers_constants_1.DECORATED_PREFIX}:Provider:${token || ethers_constants_1.DEFAULT_TOKEN}`;
}
exports.getEthersToken = getEthersToken;
function getContractToken(token) {
    return `${ethers_constants_1.DECORATED_PREFIX}:Contract:${token || ethers_constants_1.DEFAULT_TOKEN}`;
}
exports.getContractToken = getContractToken;
function getSignerToken(token) {
    return `${ethers_constants_1.DECORATED_PREFIX}:Signer:${token || ethers_constants_1.DEFAULT_TOKEN}`;
}
exports.getSignerToken = getSignerToken;
//# sourceMappingURL=ethers.utils.js.map