import type { ComponentType, ReactNode } from "react";

// One copy with no body padding: a full-page story measures the viewport, which two themed copies would double.
export function fullPage(Story: ComponentType): ReactNode {
  document.body.style.padding = "0";
  return <Story />;
}
