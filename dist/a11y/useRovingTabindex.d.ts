import { KeyboardEvent as ReactKeyboardEvent } from 'react';
export type RovingOrientation = "both" | "vertical" | "horizontal";
export declare function useRovingTabindex({ orientation }?: {
    orientation?: RovingOrientation;
}): {
    containerProps: {
        onKeyDown: (e: ReactKeyboardEvent) => void;
    };
    itemProps: (i: number) => {
        tabIndex: 0 | -1;
        ref: (el: HTMLElement | null) => void;
        onFocus: () => void;
        "data-ward-roving": true;
    };
    setActive: (index: number) => void;
};
