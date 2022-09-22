import { Provider as AbstractProvider, BaseProvider } from '@ethersproject/providers';
import { Provider } from '@nestjs/common';
import { EthersModuleOptions, EthersModuleAsyncOptions } from './ethers.interface';
export declare function createBaseProvider(options: EthersModuleOptions): Promise<BaseProvider | AbstractProvider>;
export declare function createEthersProvider(options: EthersModuleOptions): Provider;
export declare function createEthersAsyncProvider(token?: string): Provider;
export declare function createAsyncOptionsProvider(options: EthersModuleAsyncOptions): Provider;
export declare function createContractProvider(token?: string): Provider;
export declare function createSignerProvider(token?: string): Provider;
