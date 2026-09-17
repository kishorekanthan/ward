import { useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import { OverlayContainerContext } from "../src/primitives/Overlay";

// Each pinned copy needs its own background and color: a bare data-theme div re-scopes tokens but inherits the body's ink and ground.
// transform makes the copy a containing block, so an Overlay's fixed scrim stays inside it instead of covering the viewport.
const themed: CSSProperties = {
  background: "var(--ward-color-bg)",
  color: "var(--ward-color-text)",
  padding: "var(--ward-space-4)",
  transform: "translateZ(0)",
};

// Overlays portal into this copy, not document.body, so they stay under the copy's theme pin.
function Copy({ theme, Story }: { theme: "light" | "dark"; Story: ComponentType }) {
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  return (
    <div data-theme={theme} style={themed} ref={setHost}>
      <OverlayContainerContext.Provider value={host}>
        <Story />
      </OverlayContainerContext.Provider>
    </div>
  );
}

// Lives outside src/ because check.mjs gate 4b wants a story beside every src .tsx.
export function bothThemes(Story: ComponentType): ReactNode {
  return (
    <>
      <Copy theme="light" Story={Story} />
      <Copy theme="dark" Story={Story} />
    </>
  );
}
