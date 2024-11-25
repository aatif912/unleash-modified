import { type Context, Unleash, type Variant } from 'unleash-client';
import type { FeatureInterface } from 'unleash-client/lib/feature';
import type { FallbackFunction } from 'unleash-client/lib/helpers';
import type { UnleashConfig } from 'unleash-client/lib/unleash';
import type { VariantWithFeatureStatus } from 'unleash-client/lib/variant';
declare class FakeUnleash extends Unleash {
    toggleDefinitions: FeatureInterface[];
    contexts: Context[];
    unleashConfig: UnleashConfig;
    constructor(unleashConfig: UnleashConfig);
    isEnabled(name: string, context?: Context, fallbackFunction?: FallbackFunction): boolean;
    isEnabled(name: string, context?: Context, fallbackValue?: boolean): boolean;
    getVariant(name: string, context?: Context, fallbackVariant?: Variant): VariantWithFeatureStatus;
    forceGetVariant(name: string, context?: Context, fallbackVariant?: Variant): Variant;
    getFeatureToggleDefinition(toggleName: string): FeatureInterface;
    getFeatureToggleDefinitions(): FeatureInterface[];
    count(toggleName: string, enabled: boolean): void;
    countVariant(toggleName: string, variantName: string): void;
}
export default FakeUnleash;
