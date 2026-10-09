import { useLayoutEffect, type RefObject } from "react";

export type MenuAlign = "start" | "end";
export type Edges = { top: number; bottom: number; left: number; right: number };
export type Extent = { width: number; height: number };
export type Placement = { top: number; left: number; maxHeight: number };

// --ward-space-1: the gap under the trigger, and the margin kept from the viewport's top and bottom.
const GAP = 4;

// Below the trigger while it fits or has the more room; above it otherwise.
function vertical(anchor: Edges, height: number, viewHeight: number) {
  const below = Math.max(0, viewHeight - anchor.bottom - GAP * 2);
  const above = Math.max(0, anchor.top - GAP * 2);
  if (height <= below || below >= above) return { top: anchor.bottom + GAP, maxHeight: below };
  return { top: anchor.top - GAP - Math.min(height, above), maxHeight: above };
}

// On the asked edge while it fits, else the other edge when that fits, then held inside the viewport.
function horizontal(anchor: Edges, width: number, viewWidth: number, align: MenuAlign) {
  const lefts = { start: anchor.left, end: anchor.right - width };
  const fits = { start: lefts.start + width <= viewWidth, end: lefts.end >= 0 };
  const other = align === "end" ? "start" : "end";
  const side = fits[align] || !fits[other] ? align : other;
  return Math.min(Math.max(lefts[side], 0), Math.max(0, viewWidth - width));
}

export function placeMenu(anchor: Edges, menu: Extent, view: Extent, align: MenuAlign): Placement {
  return { ...vertical(anchor, menu.height, view.height), left: horizontal(anchor, menu.width, view.width, align) };
}

function px(value: number): string {
  return `${Math.round(value * 100) / 100}px`;
}

function measure(menu: HTMLElement, anchor: HTMLElement) {
  const edges = anchor.getBoundingClientRect();
  menu.style.setProperty("--ward-anchor-width", px(edges.width));
  Object.assign(menu.style, { left: "0px", top: "0px", maxHeight: "none" });
  const box = menu.getBoundingClientRect();
  const root = document.documentElement;
  return { edges, box, view: { width: root.clientWidth, height: root.clientHeight } };
}

// A transformed ancestor without top-layer support offsets fixed boxes, so the box is shifted by where it landed.
function position(menu: HTMLElement, anchor: HTMLElement, align: MenuAlign) {
  const got = measure(menu, anchor);
  const spot = placeMenu(got.edges, got.box, got.view, align);
  Object.assign(menu.style, { left: px(spot.left - got.box.left), top: px(spot.top - got.box.top), maxHeight: px(spot.maxHeight) });
}

// The top layer lifts the menu out of every clipping box and above any open dialog; without it the menu stays fixed in place.
function raise(menu: HTMLElement): () => void {
  if (typeof menu.showPopover !== "function" || menu.matches(":popover-open")) return () => undefined;
  menu.popover = "manual";
  menu.showPopover();
  return () => {
    if (menu.matches(":popover-open")) menu.hidePopover();
  };
}

/** Holds a mounted menu against its trigger, outside every overflow box, flipping at the viewport edges. */
export function useAnchoredMenu(anchor: RefObject<HTMLElement | null>, menu: RefObject<HTMLElement | null>, align: MenuAlign = "start") {
  useLayoutEffect(() => {
    const box = menu.current;
    const at = anchor.current;
    if (!box || !at) return;
    const lower = raise(box);
    const place = () => position(box, at, align);
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
      lower();
    };
  }, [anchor, menu, align]);
  // Every render may change the menu's size (a Find query narrows the list), so it is placed again each time.
  useLayoutEffect(() => {
    if (menu.current && anchor.current) position(menu.current, anchor.current, align);
  });
}
