import { bothThemes } from "../../.storybook/bothThemes";
import { SubjectRail } from "./SubjectRail";

export default {
  title: "Layout/SubjectRail",
  component: SubjectRail,
  decorators: [bothThemes],
};

const subject = <p>The record under review sits in the subject column.</p>;
const rail = <p>Cost, gate state and history sit in the rail.</p>;

export const Preview = { args: { children: subject, rail } };

export const DryRunWidth = { args: { children: subject, rail, width: "dryrun", railLabel: "Dry run" } };

export const StickyRail = { args: { children: subject, rail, sticky: true } };

export const Ruled = { args: { children: subject, rail, ruled: true } };
