import { bothThemes } from "../../.storybook/bothThemes";
import { Figure } from "./Figure";

// A local picture, so the story needs no network.
const picture = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 16 9'><rect width='16' height='9' fill='gray' fill-opacity='0.25'/><circle cx='8' cy='4.5' r='2' fill='gray'/></svg>",
)}`;

export default {
  title: "Site/Figure",
  component: Figure,
  decorators: [bothThemes],
};

export const Image = {
  render: () => (
    <div style={{ maxInlineSize: "var(--ward-width-form)" }}>
      <Figure src={picture} alt="The pipeline dashboard" width={1600} height={900} ratio="16/9" caption="The dashboard after the move to batch loads." />
    </div>
  ),
};

export const CustomMedia = {
  render: () => (
    <div style={{ maxInlineSize: "var(--ward-width-form)" }}>
      <Figure ratio="2/1" caption="A diagram drawn as inline SVG.">
        <svg viewBox="0 0 200 100" role="img" aria-label="Two boxes joined by a line">
          <rect x="20" y="35" width="50" height="30" fill="none" stroke="currentColor" />
          <line x1="70" y1="50" x2="130" y2="50" stroke="currentColor" />
          <rect x="130" y="35" width="50" height="30" fill="none" stroke="currentColor" />
        </svg>
      </Figure>
    </div>
  ),
};

export const NoCaption = {
  render: () => (
    <div style={{ maxInlineSize: "var(--ward-width-dryrun)" }}>
      <Figure src={picture} alt="A square crop" width={1600} height={900} ratio="1/1" />
    </div>
  ),
};
