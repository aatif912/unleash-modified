import Client from './client';
import type { IProxyConfig } from './config';
export declare const createSingletonClient: (config: IProxyConfig) => Client;
export declare const createNewClient: (config: IProxyConfig) => Client;
