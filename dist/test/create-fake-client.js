"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeClient = void 0;
const strategy_1 = require("unleash-client/lib/strategy");
const client_1 = __importDefault(require("../client"));
const metrics_mock_1 = __importDefault(require("./metrics.mock"));
const unleash_mock_1 = __importDefault(require("./unleash.mock"));
const createFakeClient = (config) => {
    const unleash = new unleash_mock_1.default({
        ...config,
        url: config.unleashUrl,
        appName: config.unleashAppName,
    });
    const metrics = new metrics_mock_1.default({
        appName: config.unleashAppName,
        instanceId: config.unleashInstanceId,
        metricsInterval: config.metricsInterval,
        url: config.unleashUrl,
        strategies: strategy_1.defaultStrategies.map((s) => s.name),
    });
    const client = new client_1.default(config, unleash, metrics);
    return { client, metrics };
};
exports.createFakeClient = createFakeClient;
//# sourceMappingURL=create-fake-client.js.map