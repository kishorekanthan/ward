import { bothThemes } from "../../.storybook/bothThemes";
import { Section } from "./Section";

export default {
  title: "Site/Section",
  component: Section,
  decorators: [bothThemes],
};

export const WithLink = {
  render: () => (
    <Section title="Selected work" eyebrow="Work" link={{ href: "/work", label: "All work" }} id="work">
      <p style={{ margin: 0 }}>Three projects from the last two years.</p>
    </Section>
  ),
};

export const Tight = {
  render: () => (
    <Section title="Recent writing" space="6" headingLevel={3}>
      <p style={{ margin: 0 }}>Notes on data platforms and cost.</p>
    </Section>
  ),
};
