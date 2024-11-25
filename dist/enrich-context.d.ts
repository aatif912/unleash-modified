import type { Context } from 'unleash-client';
export type ContextEnricher = (context: Context) => Promise<Context>;
export declare function enrichContext(contextEnrichers: ContextEnricher[], context: Context): Promise<Context>;
