import { Gauge as PromGauge, type GaugeConfiguration } from 'prom-client';
/**
 * A wrapped instance of prom-client's Gauge, overriding some of its methods for enhanced functionality and type-safety.
 */
export type Gauge<T extends string = string> = {
    gauge: PromGauge<T>;
    labels: (labels: Record<T, string | number>) => PromGauge.Internal<T>;
    reset: () => void;
    set: (value: number) => void;
};
export declare const createGauge: <T extends string>(options: GaugeConfiguration<T>) => Gauge<T>;
