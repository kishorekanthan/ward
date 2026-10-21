import { bothThemes } from "../../.storybook/bothThemes";
import { Figure } from "./Figure";
import { Hero } from "./Hero";

export default {
  title: "Site/Hero",
  component: Hero,
  decorators: [bothThemes],
};

const actions = [
  { href: "/work", label: "See the work" },
  { href: "/about", label: "About me" },
];

export const TextOnly = {
  args: {
    eyebrow: "Data engineer",
    title: "I build data platforms that stay cheap as they grow",
    lead: "Ten years of pipelines, warehouses and the cost reviews that follow them.",
    actions,
  },
};

export const WithVisual = {
  render: () => (
    <Hero
      eyebrow="Data engineer"
      title="I build data platforms that stay cheap as they grow"
      lead="Ten years of pipelines, warehouses and the cost reviews that follow them."
      actions={actions}
      visual={
        <Figure ratio="4/3">
          <svg viewBox="0 0 120 90" role="img" aria-label="Three boxes in a row joined by lines">
            <rect x="8" y="35" width="24" height="20" fill="none" stroke="currentColor" />
            <line x1="32" y1="45" x2="48" y2="45" stroke="currentColor" />
            <rect x="48" y="35" width="24" height="20" fill="none" stroke="currentColor" />
            <line x1="72" y1="45" x2="88" y2="45" stroke="currentColor" />
            <rect x="88" y="35" width="24" height="20" fill="none" stroke="currentColor" />
          </svg>
        </Figure>
      }
    />
  ),
};
