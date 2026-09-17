import { LiveConnection } from '../live/types';
export type ConnectionMarkProps = {
    connection: LiveConnection;
    since?: string;
    lastEventAt?: string | null;
};
export declare function ConnectionMark({ connection, since, lastEventAt }: ConnectionMarkProps): import("react").JSX.Element;
