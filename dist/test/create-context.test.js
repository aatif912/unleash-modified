"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_context_1 = require("../create-context");
test('should remove undefined properties', () => {
    const context = (0, create_context_1.createContext)({
        appName: undefined,
        userId: '123',
    });
    expect(context).not.toHaveProperty('appName');
    expect(context).toHaveProperty('userId');
    expect(context.userId).toBe('123');
});
test('should move rest props to properties', () => {
    const context = (0, create_context_1.createContext)({
        userId: '123',
        tenantId: 'some-tenant',
        region: 'eu',
    });
    expect(context.userId).toBe('123');
    expect(context).not.toHaveProperty('tenantId');
    expect(context).not.toHaveProperty('region');
    expect(context.properties?.region).toBe('eu');
    expect(context.properties?.tenantId).toBe('some-tenant');
});
test('when an extra property is both on the top-level and under properties, the properties-level wins', () => {
    const context = (0, create_context_1.createContext)({
        customProperty: 'top-level',
        properties: {
            customProperty: 'properties-level',
        },
    });
    expect(context).not.toHaveProperty('customProperty');
    expect(context.properties?.customProperty).toBe('properties-level');
});
test('If you specify top-level properties under properties, they do not get moved up', () => {
    const context = (0, create_context_1.createContext)({
        properties: {
            appName: 'name',
        },
    });
    expect(context.properties?.appName).toBe('name');
    expect(context.appName).toBe(undefined);
});
test('should keep properties', () => {
    const context = (0, create_context_1.createContext)({
        userId: '123',
        tenantId: 'some-tenant',
        region: 'eu',
        properties: {
            a: 'b',
            b: 'test',
        },
    });
    expect(context.userId).toBe('123');
    expect(context).not.toHaveProperty('tenantId');
    expect(context).not.toHaveProperty('region');
    expect(context.properties?.region).toBe('eu');
    expect(context.properties?.tenantId).toBe('some-tenant');
    expect(context.properties?.a).toBe('b');
    expect(context.properties?.b).toBe('test');
});
test('will not blow up if properties is an array', () => {
    const context = (0, create_context_1.createContext)({
        userId: '123',
        tenantId: 'some-tenant',
        region: 'eu',
        properties: ['some'],
    });
    // console.log(context);
    expect(context.userId).toBe('123');
    expect(context).not.toHaveProperty('tenantId');
    expect(context).not.toHaveProperty('region');
});
test('accepts current time as a context value', () => {
    const targetDate = new Date('2024-01-01T00:00:00.000Z');
    const context = (0, create_context_1.createContext)({
        currentTime: targetDate.toISOString(),
    });
    expect(context.currentTime).toStrictEqual(targetDate);
});
test('invalid time strings fall back to undefined currentTime', () => {
    const context = (0, create_context_1.createContext)({
        currentTime: 'its cute that you think this will parse',
    });
    expect(context).not.toHaveProperty('currentTime');
});
test('missing time current time falls back to undefined currentTime', () => {
    const context = (0, create_context_1.createContext)({
        userId: '123',
    });
    expect(context).not.toHaveProperty('currentTime');
});
test.skip('will not blow up if userId is an array', () => {
    const context = (0, create_context_1.createContext)({
        userId: ['123'],
        tenantId: 'some-tenant',
        region: 'eu',
        properties: ['some'],
    });
    // console.log(context);
    expect(context.userId).toBe('123');
    expect(context).not.toHaveProperty('tenantId');
    expect(context).not.toHaveProperty('region');
});
//# sourceMappingURL=create-context.test.js.map