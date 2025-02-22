import { type CreateSchemaType } from '../openapi-types';
export declare const schema: {
    readonly type: "object";
    readonly required: readonly ["name", "enabled"];
    readonly additionalProperties: false;
    readonly properties: {
        readonly name: {
            readonly type: "string";
        };
        readonly enabled: {
            readonly type: "boolean";
        };
        readonly feature_enabled: {
            readonly type: "boolean";
        };
        readonly featureEnabled: {
            readonly type: "boolean";
        };
        readonly payload: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["type", "value"];
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["string", "json", "csv", "number"];
                };
                readonly value: {
                    readonly type: "string";
                };
            };
        };
    };
};
export type VariantSchema = CreateSchemaType<typeof schema>;
export declare const variantSchema: {
    type: "object";
    required: ["name", "enabled"];
    additionalProperties: false;
    properties: {
        name: {
            type: "string";
        };
        enabled: {
            type: "boolean";
        };
        feature_enabled: {
            type: "boolean";
        };
        featureEnabled: {
            type: "boolean";
        };
        payload: {
            type: "object";
            additionalProperties: false;
            required: ["type", "value"];
            properties: {
                type: {
                    type: "string";
                    enum: ["string", "json", "csv", "number"];
                };
                value: {
                    type: "string";
                };
            };
        };
    };
};
