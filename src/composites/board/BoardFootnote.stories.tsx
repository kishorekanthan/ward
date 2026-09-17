import { bothThemes } from "../../../.storybook/bothThemes";
import { BoardFootnote } from "./BoardFootnote";

export default {
  title: "Board/BoardFootnote",
  component: BoardFootnote,
  decorators: [bothThemes],
};

export const WithConfigureLink = {
  args: { configureHref: "#/studio/streams/ledger" },
};

export const NoteOnly = {
  args: {},
};
