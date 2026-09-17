import type { ComponentType, ReactNode } from "react";
import { bothThemes } from "./bothThemes";

export function overlayThemes(Story: ComponentType): ReactNode {
  function Stage() {
    return (
      <div style={{ minHeight: "100dvh" }}>
        <Story />
      </div>
    );
  }
  return bothThemes(Stage);
}
