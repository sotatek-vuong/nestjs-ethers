"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthersContract = void 0;
const contracts_1 = require("@ethersproject/contracts");
class EthersContract {
    constructor(provider) {
        this.provider = provider;
    }
    create(address, abi, signer) {
        return new contracts_1.Contract(address, abi, signer !== null && signer !== void 0 ? signer : this.provider);
    }
}
exports.EthersContract = EthersContract;
//# sourceMappingURL=ethers.contract.js.map