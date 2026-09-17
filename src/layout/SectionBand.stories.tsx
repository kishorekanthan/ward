import { bothThemes } from "../../.storybook/bothThemes";
import { Btn } from "../primitives/Btn";
import { SectionBand } from "./SectionBand";

export default {
  title: "Layout/SectionBand",
  component: SectionBand,
  decorators: [bothThemes],
};

export const Default = {
  args: { label: "Board filters", children: <p>Owner · All · 14 items</p> },
};

export const WithActions = {
  args: {
    label: "Board filters",
    children: <p>Owner · All · 14 items</p>,
    actions: <Btn variant="secondary">Configure board</Btn>,
  },
};
