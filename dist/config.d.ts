import type { CorsOptions } from 'cors';
import type { Application } from 'express';
import type { ClientFeaturesResponse, Strategy, TagFilter } from 'unleash-client';
import type { HttpOptions } from 'unleash-client/lib/http-options';
import type { BootstrapOptions } from 'unleash-client/lib/repository/bootstrap-provider';
import type { StorageProvider } from 'unleash-client/lib/repository/storage-provider';
import type { ContextEnricher } from './enrich-context';
import { type LogLevel, type Logger } from './logger';
export interface ServerSideSdkConfig {
    tokens: string[];
}
export interface IProxyOption {
    unleashUrl?: string;
    unleashApiToken?: string;
    unleashAppName?: string;
    unleashInstanceId?: string;
    customStrategies?: Strategy[];
    proxySecrets?: string[];
    clientKeys?: string[];
    preHook?: (app: Application) => void;
    proxyBasePath?: string;
    refreshInterval?: number;
    metricsInterval?: number;
    metricsJitter?: number;
    environment?: string;
    projectName?: string;
    logger?: Logger;
    useJsonLogger?: boolean;
    logLevel?: LogLevel;
    trustProxy?: boolean | string | number;
    namePrefix?: string;
    tags?: Array<TagFilter>;
    clientKeysHeaderName?: string;
    enableOAS?: boolean;
    cors?: CorsOptions;
    enableAllEndpoint?: boolean;
    storageProvider?: StorageProvider<ClientFeaturesResponse>;
    expBootstrap?: BootstrapOptions;
    expServerSideSdkConfig?: ServerSideSdkConfig;
    httpOptions?: HttpOptions;
    expCustomEnrichers?: ContextEnricher[];
    clientMode?: 'singleton' | 'new';
}
export interface IProxyConfig {
    unleashUrl: string;
    unleashApiToken: string;
    unleashAppName: string;
    unleashInstanceId: string;
    customStrategies?: Strategy[];
    clientKeys: string[];
    proxyBasePath: string;
    refreshInterval: number;
    metricsInterval: number;
    metricsJitter: number;
    environment?: string;
    projectName?: string;
    logger: Logger;
    disableMetrics: boolean;
    trustProxy: boolean | string | number;
    namePrefix?: string;
    tags?: Array<TagFilter>;
    enableOAS: boolean;
    enableAllEndpoint?: boolean;
    clientKeysHeaderName: string;
    serverSideSdkConfig?: ServerSideSdkConfig;
    bootstrap?: BootstrapOptions;
    cors: CorsOptions;
    httpOptions?: HttpOptions;
    storageProvider?: StorageProvider<ClientFeaturesResponse>;
    expCustomEnrichers?: ContextEnricher[];
}
export declare function sanitizeBasePath(path?: string): string;
export declare function createProxyConfig(option: IProxyOption): IProxyConfig;
