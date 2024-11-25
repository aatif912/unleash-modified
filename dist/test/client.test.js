"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const logger_1 = require("../logger");
const create_fake_client_1 = require("./create-fake-client");
test('should add environment to isEnabled calls', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashApiToken: '123',
        unleashUrl: 'http://localhost:4242/api',
        proxySecrets: ['s1'],
        environment: 'test',
        logLevel: logger_1.LogLevel.error,
    });
    const { client } = (0, create_fake_client_1.createFakeClient)(config);
    const fakeUnleash = client.unleash;
    fakeUnleash.toggleDefinitions.push({
        name: 'test',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    client.getEnabledToggles({});
    expect(fakeUnleash.contexts[0].environment).toBe('test');
    client.destroy();
});
test('should override environment to isEnabled calls', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashApiToken: '123',
        unleashUrl: 'http://localhost:4242/api',
        proxySecrets: ['s1'],
        environment: 'never-change-me',
        logLevel: logger_1.LogLevel.error,
    });
    const { client } = (0, create_fake_client_1.createFakeClient)(config);
    const fakeUnleash = client.unleash;
    fakeUnleash.toggleDefinitions.push({
        name: 'test',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    client.getEnabledToggles({ environment: 'some' });
    expect(fakeUnleash.contexts[0].environment).toBe('never-change-me');
    client.destroy();
});
test('should return all toggles', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashApiToken: '123',
        unleashUrl: 'http://localhost:4242/api',
        proxySecrets: ['s1'],
        environment: 'never-change-me',
        logLevel: logger_1.LogLevel.error,
    });
    const { client } = (0, create_fake_client_1.createFakeClient)(config);
    const fakeUnleash = client.unleash;
    fakeUnleash.toggleDefinitions.push({
        name: 'test',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    fakeUnleash.toggleDefinitions.push({
        name: 'test-2',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    fakeUnleash.toggleDefinitions.push({
        name: 'test-3',
        enabled: true,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    const result = client.getAllToggles({ environment: 'some' });
    expect(result.length).toBe(3);
    client.destroy();
});
test('should return default variant for disabled toggles', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashApiToken: '123',
        unleashUrl: 'http://localhost:4242/api',
        proxySecrets: ['s1'],
        environment: 'never-change-me',
        logLevel: logger_1.LogLevel.error,
    });
    const { client } = (0, create_fake_client_1.createFakeClient)(config);
    const fakeUnleash = client.unleash;
    fakeUnleash.toggleDefinitions.push({
        name: 'test',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    fakeUnleash.toggleDefinitions.push({
        name: 'test-2',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    fakeUnleash.toggleDefinitions.push({
        name: 'test-3',
        enabled: true,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    const result = client.getAllToggles({ environment: 'some' });
    expect(result.length).toBe(3);
    expect(result[0].variant?.name).toBe('disabled');
    expect(result[0].variant?.enabled).toBe(false);
    expect(result[1].variant?.name).toBe('disabled');
    expect(result[1].variant?.enabled).toBe(false);
    expect(result[2].variant?.name).toBe('disabled');
    expect(result[2].variant?.enabled).toBe(false);
    client.destroy();
});
test('should register metrics', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashApiToken: '123',
        unleashUrl: 'http://localhost:4242/api',
        proxySecrets: ['s1'],
        environment: 'never-change-me',
        logLevel: logger_1.LogLevel.error,
    });
    const { client, metrics } = (0, create_fake_client_1.createFakeClient)(config);
    client.registerMetrics({
        bucket: {
            toggles: {
                toggle: {
                    yes: 3,
                    no: 1,
                    variants: { variantA: 2, variantB: 1, disabled: 1 },
                },
            },
        },
    });
    expect(metrics.recordedCount).toStrictEqual([
        ['toggle', true],
        ['toggle', true],
        ['toggle', true],
        ['toggle', false],
    ]);
    expect(metrics.recordedCountVariant).toStrictEqual([
        ['toggle', 'variantA'],
        ['toggle', 'variantA'],
        ['toggle', 'variantB'],
        ['toggle', 'disabled'],
    ]);
});
//# sourceMappingURL=client.test.js.map