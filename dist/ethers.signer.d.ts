import { ExternallyOwnedAccount, VoidSigner } from '@ethersproject/abstract-signer';
import { BytesLike } from '@ethersproject/bytes';
import { ProgressCallback } from '@ethersproject/json-wallets';
import { Provider as AbstractProvider } from '@ethersproject/providers';
import { SigningKey } from '@ethersproject/signing-key';
import { Wallet } from '@ethersproject/wallet';
import { Wordlist } from '@ethersproject/wordlists';
import { RandomWalletOptions } from './ethers.interface';
export declare class EthersSigner {
    private readonly provider;
    constructor(provider: AbstractProvider);
    createWallet(privateKey: BytesLike | ExternallyOwnedAccount | SigningKey): Wallet;
    createRandomWallet(options?: RandomWalletOptions): Wallet;
    createWalletFromEncryptedJson(jsonString: string, password: BytesLike, progressCallback?: ProgressCallback): Promise<Wallet>;
    createWalletfromMnemonic(mnemonic: string, path?: string, wordlist?: Wordlist): Wallet;
    createVoidSigner(address: string): VoidSigner;
}
