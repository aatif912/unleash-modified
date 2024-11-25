import Metrics from 'unleash-client/lib/metrics';
declare class FakeMetrics extends Metrics {
    recordedCount: [string, boolean][];
    recordedCountVariant: [string, string][];
    start(): void;
    count(name: string, enabled: boolean): void;
    countVariant(name: string, variantName: string): void;
    on(): this;
}
export default FakeMetrics;
