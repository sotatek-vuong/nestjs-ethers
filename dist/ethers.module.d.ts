import { DynamicModule } from '@nestjs/common';
import { EthersModuleOptions, EthersModuleAsyncOptions } from './ethers.interface';
export declare class EthersModule {
    static forRoot(options?: EthersModuleOptions): DynamicModule;
    static forRootAsync(options: EthersModuleAsyncOptions): DynamicModule;
}
