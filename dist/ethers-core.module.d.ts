import { DynamicModule, OnApplicationShutdown } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { EthersModuleOptions, EthersModuleAsyncOptions } from './ethers.interface';
export declare class EthersCoreModule implements OnApplicationShutdown {
    private readonly discoveryService;
    constructor(discoveryService: DiscoveryService);
    static forRoot(options: EthersModuleOptions): DynamicModule;
    static forRootAsync(options: EthersModuleAsyncOptions): DynamicModule;
    onApplicationShutdown(): Promise<void>;
}
