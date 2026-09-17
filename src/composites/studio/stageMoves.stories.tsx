import { bothThemes } from "../../../.storybook/bothThemes";
import { MoveAnnouncer, MoveButton } from "./stageMoves";

export default {
  title: "Studio/stageMoves",
  component: MoveButton,
  decorators: [bothThemes],
};

export const Buttons = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--ward-space-2)" }}>
      <MoveButton id="review" name="Review" direction="up" onMove={() => {}} />
      <MoveButton id="review" name="Review" direction="down" onMove={() => {}} />
      <MoveAnnouncer text="Review moved to position 2 of 4." />
    </div>
  ),
};
