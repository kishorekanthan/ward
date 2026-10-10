import { vi } from "vitest";

export type Spot = { left: number; top: number; width: number; height: number };

const rectOf = ({ left, top, width, height }: Spot) => ({ left, top, width, height, x: left, y: top, right: left + width, bottom: top + height, toJSON: () => ({}) }) as DOMRect;

// jsdom has no layout: a placed element reports its spot, any other reports `size` wherever its inline left and top put it.
export function stubLayout(view: { width: number; height: number }, size: { width: number; height: number }) {
  const spots = new Map<Element, Spot>();
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    return rectOf(spots.get(this) ?? { left: parseFloat(this.style.left) || 0, top: parseFloat(this.style.top) || 0, ...size });
  });
  Object.defineProperty(document.documentElement, "clientWidth", { configurable: true, value: view.width });
  Object.defineProperty(document.documentElement, "clientHeight", { configurable: true, value: view.height });
  return { place: (el: Element, spot: Spot) => spots.set(el, spot) };
}

export function unstubLayout() {
  vi.restoreAllMocks();
  Reflect.deleteProperty(document.documentElement, "clientWidth");
  Reflect.deleteProperty(document.documentElement, "clientHeight");
}
