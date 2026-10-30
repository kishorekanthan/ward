import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "./ThemeProvider";

const root = document.documentElement;
const attrs = () => ({ theme: root.getAttribute("data-theme"), accent: root.getAttribute("data-accent"), density: root.getAttribute("data-density") });
const unset = { theme: null, accent: null, density: null };

// A stand-in for the dark-scheme and contrast queries: each records its listeners so a test can flip the device setting and see who still listens.
function stubQuery(media: string, matches: boolean) {
  const listeners = new Set<() => void>();
  const query = {
    matches,
    media,
    addEventListener: (_: string, fn: () => void) => listeners.add(fn),
    removeEventListener: (_: string, fn: () => void) => listeners.delete(fn),
  };
  const flip = (next: boolean) => {
    query.matches = next;
    act(() => listeners.forEach((fn) => fn()));
  };
  return { query, listeners, flip };
}

function stubSystem(dark: boolean, more = false) {
  const scheme = stubQuery("(prefers-color-scheme: dark)", dark);
  const contrast = stubQuery("(prefers-contrast: more)", more);
  const asked: string[] = [];
  window.matchMedia = ((media: string) => {
    asked.push(media);
    return media === contrast.query.media ? contrast.query : scheme.query;
  }) as unknown as typeof window.matchMedia;
  return { asked, listeners: scheme.listeners, flip: scheme.flip, contrast };
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

  it("sets data-contrast only for High, and Standard is the default", () => {
    const contrast = () => root.getAttribute("data-contrast");
    const view = render(<ThemeProvider theme="light" />);
    expect(contrast()).toBeNull();
    view.rerender(<ThemeProvider theme="light" contrast="more" />);
    expect(contrast()).toBe("more");
    view.rerender(<ThemeProvider theme="light" contrast="standard" />);
    expect(contrast()).toBeNull();
    view.rerender(<ThemeProvider theme="light" contrast="more" />);
    view.unmount();
    expect(contrast()).toBeNull();
  });

  it("resolves system contrast from prefers-contrast: more and follows its change events", () => {
    const system = stubSystem(false, true);
    const view = render(<ThemeProvider theme="light" contrast="system" />);
    expect(system.asked).toContain("(prefers-contrast: more)");
    expect(root.getAttribute("data-contrast")).toBe("more");
    system.contrast.flip(false);
    expect(root.getAttribute("data-contrast")).toBeNull();
    system.contrast.flip(true);
    expect(root.getAttribute("data-contrast")).toBe("more");
    view.unmount();
    expect(system.contrast.listeners.size).toBe(0);
    expect(root.getAttribute("data-contrast")).toBeNull();
  });

  it("ignores the device's contrast setting once Standard or High is chosen", () => {
    const system = stubSystem(false, true);
    const view = render(<ThemeProvider theme="light" contrast="standard" />);
    expect(system.contrast.listeners.size).toBe(0);
    expect(root.getAttribute("data-contrast")).toBeNull();
    view.rerender(<ThemeProvider theme="light" contrast="more" />);
    system.contrast.flip(false);
    expect(root.getAttribute("data-contrast")).toBe("more");
    view.unmount();
  });

  it("reads system contrast as standard where matchMedia is absent", () => {
    Reflect.deleteProperty(window, "matchMedia");
    const view = render(<ThemeProvider theme="light" contrast="system" />);
    expect(root.getAttribute("data-contrast")).toBeNull();
    view.unmount();
  });
});
