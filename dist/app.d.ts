import { type Application } from 'express';
import type { IClient } from './client';
import { type IProxyOption } from './config';
export declare function createApp(options: IProxyOption, unleashClient?: IClient, app?: Application): Application;
