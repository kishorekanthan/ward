export type LiveTransportConnection = { close(): void };

export type LiveTransportHandlers = {
  onEvent(data: string, eventId: string, eventType?: string): void;
  onOpen(): void;
  onError(): void;
};

export type LiveTransport = (
  url: string,
  resume: { lastEventId: string },
  handlers: LiveTransportHandlers,
) => LiveTransportConnection;

export const eventSourceTransport: LiveTransport = (url, resume, handlers) => {
  void resume;
  const es = new EventSource(url);
  const deliver = (event: MessageEvent<string>) => handlers.onEvent(event.data, event.lastEventId, event.type);
  es.onmessage = deliver;
  for (const type of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"]) {
    es.addEventListener(type, deliver);
  }
  es.onopen = () => handlers.onOpen();
  es.onerror = () => handlers.onError();
  return { close: () => es.close() };
};
