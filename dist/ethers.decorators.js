"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectSignerProvider = exports.InjectContractProvider = exports.InjectEthersProvider = void 0;
const common_1 = require("@nestjs/common");
const ethers_utils_1 = require("./ethers.utils");
const InjectEthersProvider = (token) => {
    return (0, common_1.Inject)((0, ethers_utils_1.getEthersToken)(token));
};
exports.InjectEthersProvider = InjectEthersProvider;
const InjectContractProvider = (token) => {
    return (0, common_1.Inject)((0, ethers_utils_1.getContractToken)(token));
};
exports.InjectContractProvider = InjectContractProvider;
const InjectSignerProvider = (token) => {
    return (0, common_1.Inject)((0, ethers_utils_1.getSignerToken)(token));
};
exports.InjectSignerProvider = InjectSignerProvider;
//# sourceMappingURL=ethers.decorators.js.map