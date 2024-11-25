"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const unleash_client_1 = require("unleash-client");
const variant_1 = require("unleash-client/lib/variant");
const prom_metrics_1 = require("./prom-metrics");
class Client extends events_1.default {
    constructor(config, unleash, metrics) {
        super();
        this.ready = false;
        this.unleashApiToken = config.unleashApiToken;
        this.environment = config.environment;
        this.logger = config.logger;
        this.unleash = unleash;
        this.metrics = metrics;
        this.metrics.on('error', (msg) => this.logger.error(`metrics: ${msg}`));
        this.unleash.on('error', (msg) => this.logger.error(msg));
        this.unleash.on('ready', () => {
            this.emit('ready');
            this.ready = true;
            this.metrics.start();
        });
        this.unleash.on(unleash_client_1.UnleashEvents.Unchanged, () => {
            prom_metrics_1.lastMetricsFetch.set(new Date().getTime());
        });
        this.unleash.on(unleash_client_1.UnleashEvents.Changed, () => {
            const updatedAt = new Date().getTime();
            prom_metrics_1.lastMetricsFetch.set(updatedAt);
            prom_metrics_1.lastMetricsUpdate.set(updatedAt);
        });
    }
    setUnleashApiToken(unleashApiToken) {
        this.unleashApiToken = unleashApiToken;
    }
    fixContext(context) {
        const { environment } = this;
        if (environment) {
            return { ...context, environment };
        }
        return context;
    }
    getAllToggles(inContext) {
        this.logger.debug('Get all feature toggles for provided context', inContext);
        const context = this.fixContext(inContext);
        const sessionId = context.sessionId || String(Math.random());
        const definitions = this.unleash.getFeatureToggleDefinitions() || [];
        return definitions.map((d) => {
            const enabled = this.unleash.isEnabled(d.name, {
                ...context,
                sessionId,
            });
            const variant = enabled
                ? this.unleash.getVariant(d.name, { ...context, sessionId })
                : (0, variant_1.getDefaultVariant)();
            return {
                name: d.name,
                enabled: enabled,
                variant: variant,
                impressionData: d.impressionData,
            };
        });
    }
    getEnabledToggles(inContext) {
        this.logger.debug('Get enabled feature toggles for provided context', inContext);
        const context = this.fixContext(inContext);
        const sessionId = context.sessionId || String(Math.random());
        const definitions = this.unleash.getFeatureToggleDefinitions() || [];
        return definitions
            .filter((d) => this.unleash.isEnabled(d.name, { ...context, sessionId }))
            .map((d) => ({
            name: d.name,
            enabled: true,
            variant: this.unleash.getVariant(d.name, {
                ...context,
                sessionId,
            }),
            impressionData: d.impressionData,
        }));
    }
    getDefinedToggles(toggleNames, inContext) {
        const context = this.fixContext(inContext);
        return toggleNames.map((name) => {
            const definition = this.unleash.getFeatureToggleDefinition(name);
            const enabled = this.unleash.isEnabled(name, context);
            this.metrics.count(name, enabled);
            return {
                name,
                enabled,
                variant: this.unleash.getVariant(name, context),
                impressionData: definition?.impressionData ?? false,
            };
        });
    }
    getFeatureToggleDefinitions() {
        return this.unleash.getFeatureToggleDefinitions();
    }
    /*
     * A very simplistic implementation which support counts.
     * In future we must consider to look at start/stop times
     * and adjust counting thereafter.
     */
    registerMetrics(metrics) {
        const { toggles } = metrics.bucket;
        Object.keys(toggles).forEach((toggleName) => {
            const toggle = toggles[toggleName];
            const yesCount = toggle.yes ?? 0;
            const noCount = toggle.no ?? 0;
            [...Array(yesCount)].forEach(() => this.metrics.count(toggleName, true));
            [...Array(noCount)].forEach(() => this.metrics.count(toggleName, false));
            const variants = toggle.variants;
            if (variants) {
                Object.entries(variants).forEach(([variantName, variantCount]) => {
                    [...Array(variantCount)].forEach(() => this.metrics.countVariant(toggleName, variantName));
                });
            }
        });
    }
    destroy() {
        this.unleash.destroy();
    }
    isReady() {
        return this.ready;
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map