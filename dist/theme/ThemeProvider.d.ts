import { ReactNode } from 'react';
import { AccentPreset, Density } from '../tokens';
export type ThemeSetting = "system" | "light" | "dark";
export type ThemeProviderProps = {
    theme: ThemeSetting;
    accent?: AccentPreset;
    density?: Density;
    children?: ReactNode;
};
export declare function ThemeProvider({ theme, accent, density, children }: ThemeProviderProps): import("react").JSX.Element;
