"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
class MockClient extends events_1.default {
    constructor(toggles = []) {
        super();
        this.queriedContexts = [];
        this.metrics = [];
        this.toggles = toggles;
        this.apiToken = 'default';
    }
    getFeatureToggleDefinitions() {
        return this.toggles.map((t) => ({
            name: t.name,
            strategies: [{ name: 'default', parameters: {}, constraints: [] }],
            enabled: t.enabled,
            project: 'default',
            stale: false,
            type: 'release',
            variants: [],
            impressionData: false,
        }));
    }
    isReady() {
        return false;
    }
    setUnleashApiToken(apiToken) {
        this.apiToken = apiToken;
    }
    getAllToggles(context) {
        this.queriedContexts.push(context);
        return this.toggles;
    }
    getEnabledToggles(context) {
        this.queriedContexts.push(context);
        return this.toggles;
    }
    getDefinedToggles(toggleNames, context) {
        this.queriedContexts.push(context);
        return this.toggles.filter((t) => toggleNames.some((name) => name === t.name));
    }
    registerMetrics(metrics) {
        this.metrics.push(metrics);
    }
}
exports.default = MockClient;
//# sourceMappingURL=client.mock.js.map