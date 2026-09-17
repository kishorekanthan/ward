import { useCallback, useEffect, useRef, type RefObject } from "react";
import { ms } from "../tokens";

export type FlashColour = "blue" | "orange" | "green";
type FixedFlash = () => void;
type VariableFlash = (colour: FlashColour) => void;

function reducedMotion(): boolean {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clearFlash(element: HTMLElement) {
  element.classList.remove("ward-border-flash");
  element.removeAttribute("data-flash");
}

export function useBorderFlash(ref: RefObject<HTMLElement | null>, colour: FlashColour): FixedFlash;
export function useBorderFlash(ref: RefObject<HTMLElement | null>): VariableFlash;
export function useBorderFlash(ref: RefObject<HTMLElement | null>, colour?: FlashColour): FixedFlash | VariableFlash {
  const timer = useRef(0);
  const fire = useCallback((requested?: FlashColour) => {
    const chosen = requested ?? colour;
    const element = ref.current;
    if (element === null) return;
    if (chosen === undefined) return;
    if (reducedMotion()) return;
    element.style.setProperty("--ward-flash-colour", `var(--ward-color-${chosen})`);
    element.style.setProperty("--flash", `var(--ward-color-${chosen})`);
    element.classList.add("ward-border-flash");
    element.setAttribute("data-flash", "true");
    element.addEventListener("animationend", () => clearFlash(element), { once: true });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => clearFlash(element), ms.flash);
  }, [colour, ref]);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return colour === undefined ? (requested) => fire(requested) : () => fire(colour);
}
