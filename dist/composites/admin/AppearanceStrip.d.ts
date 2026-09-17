import { ReactElement } from 'react';
import { BoardItem } from '../board/types';
import { StreamStep } from '../../tokens';
export type Identity = {
    name: string;
    key: string;
    streamStep: StreamStep;
};
export type AppearanceIdentity = {
    name: string;
    key: string;
    streamStep: number | null;
};
export type AppearanceStripProps = {
    draft: Identity;
    sample: BoardItem;
    streams: Identity[];
    onOpen?: (key: string) => void;
    presentation?: "compact" | "detailed";
    identities?: AppearanceIdentity[];
};
export declare function AppearanceStrip(props: AppearanceStripProps): ReactElement;
