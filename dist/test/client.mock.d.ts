import EventEmitter from 'events';
import type { Context } from 'unleash-client';
import type { FeatureInterface } from 'unleash-client/lib/feature';
import type { FeatureToggleStatus, IClient, IMetrics } from '../client';
declare class MockClient extends EventEmitter implements IClient {
    apiToken: String;
    queriedContexts: Context[];
    toggles: FeatureToggleStatus[];
    metrics: IMetrics[];
    constructor(toggles?: FeatureToggleStatus[]);
    getFeatureToggleDefinitions(): FeatureInterface[];
    isReady(): boolean;
    setUnleashApiToken(apiToken: string): void;
    getAllToggles(context: Context): FeatureToggleStatus[];
    getEnabledToggles(context: Context): FeatureToggleStatus[];
    getDefinedToggles(toggleNames: string[], context: Context): FeatureToggleStatus[];
    registerMetrics(metrics: IMetrics): void;
}
export default MockClient;
