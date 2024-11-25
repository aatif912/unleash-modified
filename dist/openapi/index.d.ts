import type { OpenAPIV3 } from 'openapi-types';
export declare const createOpenApiSchema: (serverUrl?: string, clientKeysHeaderName?: string) => Omit<OpenAPIV3.Document, "paths">;
