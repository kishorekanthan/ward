import { KeyboardEvent as ReactKeyboardEvent, RefObject } from 'react';
export declare function useFocusTrap(ref: RefObject<HTMLElement | null>): {
    onKeyDown: (e: ReactKeyboardEvent) => void;
};
