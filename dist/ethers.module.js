"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EthersModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthersModule = void 0;
const common_1 = require("@nestjs/common");
const ethers_core_module_1 = require("./ethers-core.module");
let EthersModule = EthersModule_1 = class EthersModule {
    static forRoot(options = {}) {
        return {
            module: EthersModule_1,
            imports: [ethers_core_module_1.EthersCoreModule.forRoot(options)],
        };
    }
    static forRootAsync(options) {
        return {
            module: EthersModule_1,
            imports: [ethers_core_module_1.EthersCoreModule.forRootAsync(options)],
        };
    }
};
EthersModule = EthersModule_1 = __decorate([
    (0, common_1.Module)({})
], EthersModule);
exports.EthersModule = EthersModule;
//# sourceMappingURL=ethers.module.js.map