import { fireEvent, screen } from "@testing-library/react";

if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

export function stubMatchMedia(initialMatches: boolean) {
  let matches = initialMatches;
  let media = "";
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQuery = {
    get matches() {
      return matches;
    },
    get media() {
      return media;
    },
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener(_type: string, listener: (event: MediaQueryListEvent) => void) {
      listeners.add(listener);
    },
    removeEventListener(_type: string, listener: (event: MediaQueryListEvent) => void) {
      listeners.delete(listener);
    },
    dispatchEvent: () => false,
  };
  window.matchMedia = ((query: string) => {
    media = query;
    return mediaQuery;
  }) as unknown as typeof window.matchMedia;
  return {
    setMatches(nextMatches: boolean) {
      matches = nextMatches;
      const event = { matches, media } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

// Ward's Select is a button that opens a listbox: open it and click the option, as a person would.
export function chooseOption(trigger: HTMLElement, label: string) {
  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole("option", { name: label }));
}

// The labels a Select offers, read by opening its menu and closing it again.
export function optionLabels(trigger: HTMLElement): string[] {
  fireEvent.click(trigger);
  const labels = screen.getAllByRole("option").map((option) => option.textContent ?? "");
  fireEvent.click(trigger);
  return labels;
}
