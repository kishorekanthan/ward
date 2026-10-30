import { ReactNode } from 'react';
import { AccentPreset, Contrast, Density } from '../tokens';
export type ThemeSetting = "system" | "light" | "dark";
export type ContrastSetting = "system" | Contrast;
export type ThemeProviderProps = {
    theme: ThemeSetting;
    accent?: AccentPreset;
    density?: Density;
    contrast?: ContrastSetting;
    children?: ReactNode;
};
export declare function ThemeProvider({ theme, accent, density, contrast, children }: ThemeProviderProps): import("react").JSX.Element;
