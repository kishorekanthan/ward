import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "./ThemeProvider";

const root = document.documentElement;
const attrs = () => ({ theme: root.getAttribute("data-theme"), accent: root.getAttribute("data-accent"), density: root.getAttribute("data-density") });
const unset = { theme: null, accent: null, density: null };

// A stand-in for the dark-scheme query: it records its listeners so a test can flip the system theme and see who still listens.
function stubSystem(dark: boolean) {
  const listeners = new Set<() => void>();
  const query = {
    matches: dark,
    media: "(prefers-color-scheme: dark)",
    addEventListener: (_: string, fn: () => void) => listeners.add(fn),
    removeEventListener: (_: string, fn: () => void) => listeners.delete(fn),
  };
  const asked: string[] = [];
  window.matchMedia = ((media: string) => {
    asked.push(media);
    return query;
  }) as unknown as typeof window.matchMedia;
  const flip = (next: boolean) => {
    query.matches = next;
    act(() => listeners.forEach((fn) => fn()));
  };
  return { asked, listeners, flip };
}

const setupMatchMedia = window.matchMedia;
afterEach(() => {
  window.matchMedia = setupMatchMedia;
});

describe("ThemeProvider", () => {
  it("sets theme, accent and density on the root element and renders its children", () => {
    const view = render(
      <ThemeProvider theme="dark" accent="blue" density="compact">
        <p>Board</p>
      </ThemeProvider>,
    );
    expect(attrs()).toEqual({ theme: "dark", accent: "blue", density: "compact" });
    expect(view.getByText("Board")).toBeDefined();
    view.unmount();
  });

  it("defaults to Trellis green and comfortable", () => {
    const view = render(<ThemeProvider theme="light" />);
    expect(attrs()).toEqual({ theme: "light", accent: "green", density: "comfortable" });
    view.unmount();
  });

  it("follows each prop change", () => {
    const view = render(<ThemeProvider theme="light" accent="rose" density="compact" />);
    view.rerender(<ThemeProvider theme="dark" accent="violet" density="comfortable" />);
    expect(attrs()).toEqual({ theme: "dark", accent: "violet", density: "comfortable" });
    view.rerender(<ThemeProvider theme="light" accent="orange" density="compact" />);
    expect(attrs()).toEqual({ theme: "light", accent: "orange", density: "compact" });
    view.unmount();
  });

  it("removes every attribute it set when it unmounts", () => {
    const view = render(<ThemeProvider theme="dark" accent="blue" density="compact" />);
    view.unmount();
    expect(attrs()).toEqual(unset);
  });

  it("resolves system from the dark-scheme query and follows its change events", () => {
    const system = stubSystem(true);
    const view = render(<ThemeProvider theme="system" />);
    expect(system.asked).toContain("(prefers-color-scheme: dark)");
    expect(attrs().theme).toBe("dark");
    system.flip(false);
    expect(attrs().theme).toBe("light");
    system.flip(true);
    expect(attrs().theme).toBe("dark");
    view.unmount();
    expect(system.listeners.size).toBe(0);
    expect(attrs()).toEqual(unset);
  });

  it("stops following the system once a fixed theme is chosen", () => {
    const system = stubSystem(false);
    const view = render(<ThemeProvider theme="system" />);
    expect(attrs().theme).toBe("light");
    view.rerender(<ThemeProvider theme="light" />);
    expect(system.listeners.size).toBe(0);
    system.flip(true);
    expect(attrs().theme).toBe("light");
    view.unmount();
  });

  it("reads system as light where matchMedia is absent", () => {
    Reflect.deleteProperty(window, "matchMedia");
    expect(typeof window.matchMedia).toBe("undefined");
    const view = render(<ThemeProvider theme="system" accent="blue" />);
    expect(attrs()).toEqual({ theme: "light", accent: "blue", density: "comfortable" });
    view.unmount();
  });
});
