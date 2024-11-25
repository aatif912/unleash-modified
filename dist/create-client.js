"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewClient = exports.createSingletonClient = void 0;
const unleash_client_1 = require("unleash-client");
const metrics_1 = __importDefault(require("unleash-client/lib/metrics"));
const strategy_1 = require("unleash-client/lib/strategy");
const client_1 = __importDefault(require("./client"));
const createSingletonClient = (config) => {
    const customHeadersFunction = async () => ({
        Authorization: config.unleashApiToken,
    });
    const unleash = (0, unleash_client_1.initialize)({
        url: config.unleashUrl,
        appName: config.unleashAppName,
        instanceId: config.unleashInstanceId,
        environment: config.environment,
        refreshInterval: config.refreshInterval,
        projectName: config.projectName,
        strategies: config.customStrategies,
        disableMetrics: true,
        namePrefix: config.namePrefix,
        tags: config.tags,
        customHeadersFunction,
        bootstrap: config.bootstrap,
        storageProvider: config.storageProvider,
        ...(config.httpOptions ? { httpOptions: config.httpOptions } : {}),
    });
    const metrics = new metrics_1.default({
        disableMetrics: config.disableMetrics,
        appName: config.unleashAppName,
        instanceId: config.unleashInstanceId,
        strategies: strategy_1.defaultStrategies.map((s) => s.name),
        metricsInterval: config.metricsInterval,
        metricsJitter: config.metricsJitter,
        url: config.unleashUrl,
        customHeadersFunction,
        ...(config.httpOptions ? { httpOptions: config.httpOptions } : {}),
    });
    return new client_1.default(config, unleash, metrics);
};
exports.createSingletonClient = createSingletonClient;
const createNewClient = (config) => {
    const customHeadersFunction = async () => ({
        Authorization: config.unleashApiToken,
    });
    const unleash = new unleash_client_1.Unleash({
        url: config.unleashUrl,
        appName: config.unleashAppName,
        instanceId: config.unleashInstanceId,
        environment: config.environment,
        refreshInterval: config.refreshInterval,
        projectName: config.projectName,
        strategies: config.customStrategies,
        disableMetrics: true,
        namePrefix: config.namePrefix,
        tags: config.tags,
        customHeadersFunction,
        bootstrap: config.bootstrap,
        storageProvider: config.storageProvider,
        ...(config.httpOptions ? { httpOptions: config.httpOptions } : {}),
    });
    const metrics = new metrics_1.default({
        disableMetrics: config.disableMetrics,
        appName: config.unleashAppName,
        instanceId: config.unleashInstanceId,
        strategies: strategy_1.defaultStrategies.map((s) => s.name),
        metricsInterval: config.metricsInterval,
        metricsJitter: config.metricsJitter,
        url: config.unleashUrl,
        customHeadersFunction,
        ...(config.httpOptions ? { httpOptions: config.httpOptions } : {}),
    });
    return new client_1.default(config, unleash, metrics);
};
exports.createNewClient = createNewClient;
//# sourceMappingURL=create-client.js.map