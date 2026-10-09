import { bothThemes } from "../../.storybook/bothThemes";
import { AdminIcon, BoardIcon, HomeIcon, StudioIcon } from "./NavIcons";

export default {
  title: "Layout/NavIcons",
  decorators: [bothThemes],
};

// Each icon takes the ink of its text, so it follows the theme and a current item's accent.
export const Icons = {
  render: () => (
    <p style={{ display: "flex", gap: "var(--ward-space-4)", color: "var(--ward-color-muted)" }}>
      <HomeIcon />
      <BoardIcon />
      <StudioIcon />
      <AdminIcon />
    </p>
  ),
};
