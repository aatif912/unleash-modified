import type { FromSchema, JSONSchema } from 'json-schema-to-ts';
type DeepMutable<T> = {
    -readonly [P in keyof T]: DeepMutable<T[P]>;
};
export type CreateSchemaType<T extends JSONSchema> = FromSchema<T>;
export declare const createSchemaObject: <T>(schema: T) => DeepMutable<T>;
export {};
