import { LiveTransport } from './transport';
import { LiveConnection, LiveEvent } from './types';
type Handler = (e: LiveEvent) => void;
export type LiveFeed = {
    connection: LiveConnection;
    lastEventAt: string | null;
    subscribe: (itemKey: string | "*", handler: Handler) => () => void;
};
export declare function useLiveFeed(url: string, transport: LiveTransport): LiveFeed;
export {};
