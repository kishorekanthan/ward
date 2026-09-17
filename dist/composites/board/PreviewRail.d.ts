import { GateItem } from '../studio/GateChecklist';
import { BoardConfig, BoardItem } from './types';
import { WorkCardFeed } from './WorkCard';
export type PreviewStrip = "cards" | "skeleton";
export type PreviewRailProps = {
    draft: BoardConfig;
    sample: BoardItem[];
    effects: GateItem[];
    onOpen?: (key: string) => void;
    feed?: WorkCardFeed | null;
    strip?: PreviewStrip;
    columnsNote?: string;
};
export declare function PreviewRail(props: PreviewRailProps): import("react").JSX.Element;
