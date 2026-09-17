export type LiveTransportConnection = {
    close(): void;
};
export type LiveTransportHandlers = {
    onEvent(data: string, eventId: string, eventType?: string): void;
    onOpen(): void;
    onError(): void;
};
export type LiveTransport = (url: string, resume: {
    lastEventId: string;
}, handlers: LiveTransportHandlers) => LiveTransportConnection;
export declare const eventSourceTransport: LiveTransport;
