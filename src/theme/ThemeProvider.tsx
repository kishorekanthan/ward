import { useEffect, useState, type ReactNode } from "react";
import type { AccentPreset, Density } from "../tokens";

export type ThemeSetting = "system" | "light" | "dark";

export type ThemeProviderProps = {
  theme: ThemeSetting;
  accent?: AccentPreset;
  density?: Density;
  children?: ReactNode;
};

const DARK_QUERY = "(prefers-color-scheme: dark)";

// jsdom and some embedded browsers have no matchMedia; the system theme then reads as light.
function darkQuery(): MediaQueryList | null {
  return typeof window.matchMedia === "function" ? window.matchMedia(DARK_QUERY) : null;
}

function useSystemDark(follow: boolean): boolean {
  const [dark, setDark] = useState(() => darkQuery()?.matches === true);
  useEffect(() => {
    const query = follow ? darkQuery() : null;
    if (!query) return;
    const update = () => setDark(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [follow]);
  return dark;
}

// Each attribute goes on the root element and comes off again when its value changes or the provider unmounts.
function useRootAttribute(name: string, value: string) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute(name, value);
    return () => root.removeAttribute(name);
  }, [name, value]);
}

function resolveTheme(theme: ThemeSetting, systemDark: boolean): "light" | "dark" {
  if (theme !== "system") return theme;
  return systemDark ? "dark" : "light";
}

// Controlled: the consumer owns the choice and its storage; this only writes data-theme, data-accent and data-density.
export function ThemeProvider({ theme, accent = "green", density = "comfortable", children }: ThemeProviderProps) {
  const systemDark = useSystemDark(theme === "system");
  useRootAttribute("data-theme", resolveTheme(theme, systemDark));
  useRootAttribute("data-accent", accent);
  useRootAttribute("data-density", density);
  return <>{children}</>;
}
