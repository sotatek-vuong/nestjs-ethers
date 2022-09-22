"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EthersCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthersCoreModule = void 0;
const providers_1 = require("@ethersproject/providers");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const ethers_contract_1 = require("./ethers.contract");
const ethers_providers_1 = require("./ethers.providers");
const ethers_signer_1 = require("./ethers.signer");
let EthersCoreModule = EthersCoreModule_1 = class EthersCoreModule {
    constructor(discoveryService) {
        this.discoveryService = discoveryService;
    }
    static forRoot(options) {
        const ethersProvider = (0, ethers_providers_1.createEthersProvider)(options);
        const contractProvider = (0, ethers_providers_1.createContractProvider)(options.token);
        const signerProvider = (0, ethers_providers_1.createSignerProvider)(options.token);
        return {
            module: EthersCoreModule_1,
            imports: [core_1.DiscoveryModule],
            providers: [ethers_signer_1.EthersSigner, ethers_contract_1.EthersContract, ethersProvider, contractProvider, signerProvider],
            exports: [ethers_signer_1.EthersSigner, ethers_contract_1.EthersContract, ethersProvider, contractProvider, signerProvider],
        };
    }
    static forRootAsync(options) {
        const ethersProvider = (0, ethers_providers_1.createEthersAsyncProvider)(options.token);
        const asyncOptionsProvider = (0, ethers_providers_1.createAsyncOptionsProvider)(options);
        const contractProvider = (0, ethers_providers_1.createContractProvider)(options.token);
        const signerProvider = (0, ethers_providers_1.createSignerProvider)(options.token);
        return {
            module: EthersCoreModule_1,
            imports: [core_1.DiscoveryModule, ...(options.imports || [])],
            providers: [
                ethers_signer_1.EthersSigner,
                ethers_contract_1.EthersContract,
                asyncOptionsProvider,
                ethersProvider,
                contractProvider,
                signerProvider,
                ...(options.providers || []),
            ],
            exports: [ethers_signer_1.EthersSigner, ethers_contract_1.EthersContract, ethersProvider, contractProvider, signerProvider],
        };
    }
    async onApplicationShutdown() {
        var _a;
        const providers = (_a = this.discoveryService.getProviders()) !== null && _a !== void 0 ? _a : [];
        providers.forEach((provider) => {
            const { instance } = provider !== null && provider !== void 0 ? provider : {};
            if (provider.isDependencyTreeStatic() && instance && instance instanceof providers_1.Provider) {
                instance.removeAllListeners();
            }
        });
    }
};
EthersCoreModule = EthersCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({}),
    __metadata("design:paramtypes", [core_1.DiscoveryService])
], EthersCoreModule);
exports.EthersCoreModule = EthersCoreModule;
//# sourceMappingURL=ethers-core.module.js.map