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

// Top and bottom come from the trigger; left, right and width from the edges box when there is one.
function anchorEdges(anchor: HTMLElement, side?: HTMLElement | null): Edges & Extent {
  const at = anchor.getBoundingClientRect();
  const span = side ? side.getBoundingClientRect() : at;
  return { top: at.top, bottom: at.bottom, left: span.left, right: span.right, width: span.width, height: at.height };
}

function measure(menu: HTMLElement, anchor: HTMLElement, side?: HTMLElement | null) {
  const edges = anchorEdges(anchor, side);
  menu.style.setProperty("--ward-anchor-width", px(edges.width));
  Object.assign(menu.style, { left: "0px", top: "0px", maxHeight: "none" });
  const box = menu.getBoundingClientRect();
  const root = document.documentElement;
  return { edges, box, view: { width: root.clientWidth, height: root.clientHeight } };
}

// Measuring lifts max-height, which snaps every scrolled box in the menu to its top; this puts each one back.
function keepScroll(menu: HTMLElement): () => void {
  const scrolled = [menu, ...menu.querySelectorAll<HTMLElement>("*")].filter((el) => el.scrollTop > 0);
  const tops = scrolled.map((el) => el.scrollTop);
  return () => scrolled.forEach((el, i) => (el.scrollTop = tops[i]));
}

// A transformed ancestor without top-layer support offsets fixed boxes, so the box is shifted by where it landed.
function position(menu: HTMLElement, anchor: HTMLElement, align: MenuAlign, side?: HTMLElement | null) {
  const restore = keepScroll(menu);
  const got = measure(menu, anchor, side);
  const spot = placeMenu(got.edges, got.box, got.view, align);
  Object.assign(menu.style, { left: px(spot.left - got.box.left), top: px(spot.top - got.box.top), maxHeight: px(spot.maxHeight) });
  restore();
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

/** Holds a mounted menu against its trigger, outside every overflow box, flipping at the viewport edges; edges lends its left and right. */
export function useAnchoredMenu(
  anchor: RefObject<HTMLElement | null>,
  menu: RefObject<HTMLElement | null>,
  align: MenuAlign = "start",
  edges?: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const box = menu.current;
    const at = anchor.current;
    if (!box || !at) return;
    const lower = raise(box);
    const place = () => position(box, at, align, edges?.current);
    // Scrolling inside the menu leaves it where it is.
    const onScroll = (event: Event) => {
      if (!box.contains(event.target as Node)) place();
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", place);
      lower();
    };
  }, [anchor, menu, align, edges]);
  // Every render may change the menu's size (a Find query narrows the list), so it is placed again each time.
  useLayoutEffect(() => {
    if (menu.current && anchor.current) position(menu.current, anchor.current, align, edges?.current);
  });
}
