import { VoidSigner } from '@ethersproject/abstract-signer';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { Provider as AbstractProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
export declare class EthersContract {
    private readonly provider;
    constructor(provider: AbstractProvider);
    create(address: string, abi: ContractInterface, signer?: Wallet | VoidSigner): Contract;
}
