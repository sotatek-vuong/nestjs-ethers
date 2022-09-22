"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthersSigner = void 0;
const abstract_signer_1 = require("@ethersproject/abstract-signer");
const wallet_1 = require("@ethersproject/wallet");
class EthersSigner {
    constructor(provider) {
        this.provider = provider;
    }
    createWallet(privateKey) {
        return new wallet_1.Wallet(privateKey, this.provider);
    }
    createRandomWallet(options) {
        const wallet = wallet_1.Wallet.createRandom(options);
        return wallet.connect(this.provider);
    }
    async createWalletFromEncryptedJson(jsonString, password, progressCallback) {
        const wallet = await wallet_1.Wallet.fromEncryptedJson(jsonString, password, progressCallback);
        return wallet.connect(this.provider);
    }
    createWalletfromMnemonic(mnemonic, path, wordlist) {
        const wallet = wallet_1.Wallet.fromMnemonic(mnemonic, path, wordlist);
        return wallet.connect(this.provider);
    }
    createVoidSigner(address) {
        return new abstract_signer_1.VoidSigner(address, this.provider);
    }
}
exports.EthersSigner = EthersSigner;
//# sourceMappingURL=ethers.signer.js.map