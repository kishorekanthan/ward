// The last input before a dialog opens decides whether its scripted focus shows a ring.
let lastInput: "key" | "pointer" | "none" = "none";

function onKey(event: KeyboardEvent): void {
  if (!event.metaKey && !event.ctrlKey && !event.altKey) lastInput = "key";
}

if (typeof document !== "undefined") {
  document.addEventListener("keydown", onKey, true);
  document.addEventListener("pointerdown", () => { lastInput = "pointer"; }, true);
}

export function lastInputWasKey(): boolean {
  return lastInput === "key";
}
