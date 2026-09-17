import { RefObject } from 'react';
export type FlashColour = "blue" | "orange" | "green";
type FixedFlash = () => void;
type VariableFlash = (colour: FlashColour) => void;
export declare function useBorderFlash(ref: RefObject<HTMLElement | null>, colour: FlashColour): FixedFlash;
export declare function useBorderFlash(ref: RefObject<HTMLElement | null>): VariableFlash;
export {};
