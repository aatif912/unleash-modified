import Client from '../client';
import type { IProxyConfig } from '../config';
import FakeMetrics from './metrics.mock';
export declare const createFakeClient: (config: IProxyConfig) => {
    client: Client;
    metrics: FakeMetrics;
};
