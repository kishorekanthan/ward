import { bothThemes } from "../../../.storybook/bothThemes";
import { LegacyOverCapNote } from "./compat";

export default {
  title: "Board/Legacy",
  component: LegacyOverCapNote,
  decorators: [bothThemes],
};

export const OverCapNote = { args: { count: 7, cap: 5 } };
