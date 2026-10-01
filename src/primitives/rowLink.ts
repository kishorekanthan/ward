import type { MouseEvent as ReactMouseEvent } from "react";

// A raised hint sits above the row's stretched link so its tooltip shows; its click still opens the row.
export function forwardRaisedClick(event: ReactMouseEvent<HTMLElement>): void {
  if ((event.target as Element).closest("[data-raised]") === null) return;
  const { ctrlKey, metaKey, shiftKey, altKey, button } = event;
  const init = { bubbles: true, cancelable: true, ctrlKey, metaKey, shiftKey, altKey, button };
  event.currentTarget.querySelector("a")?.dispatchEvent(new MouseEvent("click", init));
}
