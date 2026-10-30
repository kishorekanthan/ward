import { useEffect, useState, type ReactNode } from "react";
import type { AccentPreset, Contrast, Density } from "../tokens";

export type ThemeSetting = "system" | "light" | "dark";
export type ContrastSetting = "system" | Contrast;

export type ThemeProviderProps = {
  theme: ThemeSetting;
  accent?: AccentPreset;
  density?: Density;
  contrast?: ContrastSetting;
  children?: ReactNode;
};

const DARK_QUERY = "(prefers-color-scheme: dark)";
const MORE_QUERY = "(prefers-contrast: more)";

// jsdom and some embedded browsers have no matchMedia; the device setting then reads as off.
function mediaQuery(text: string): MediaQueryList | null {
  return typeof window.matchMedia === "function" ? window.matchMedia(text) : null;
}

function useSystemSetting(text: string, follow: boolean): boolean {
  const [on, setOn] = useState(() => mediaQuery(text)?.matches === true);
  useEffect(() => {
    const query = follow ? mediaQuery(text) : null;
    if (!query) return;
    const update = () => setOn(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [text, follow]);
  return on;
}

// Each attribute goes on the root element and comes off again when its value changes, turns null, or the provider unmounts.
function useRootAttribute(name: string, value: string | null) {
  useEffect(() => {
    if (value === null) return;
    const root = document.documentElement;
    root.setAttribute(name, value);
    return () => root.removeAttribute(name);
  }, [name, value]);
}

function resolveTheme(theme: ThemeSetting, systemDark: boolean): "light" | "dark" {
  if (theme !== "system") return theme;
  return systemDark ? "dark" : "light";
}

function resolveContrast(contrast: ContrastSetting, systemMore: boolean): "more" | null {
  if (contrast === "system") return systemMore ? "more" : null;
  return contrast === "more" ? "more" : null;
}

// Controlled: the consumer owns the choice and its storage; this only writes data-theme, data-accent, data-density and data-contrast.
export function ThemeProvider({ theme, accent = "green", density = "comfortable", contrast = "standard", children }: ThemeProviderProps) {
  const systemDark = useSystemSetting(DARK_QUERY, theme === "system");
  const systemMore = useSystemSetting(MORE_QUERY, contrast === "system");
  useRootAttribute("data-theme", resolveTheme(theme, systemDark));
  useRootAttribute("data-accent", accent);
  useRootAttribute("data-density", density);
  useRootAttribute("data-contrast", resolveContrast(contrast, systemMore));
  return <>{children}</>;
}
