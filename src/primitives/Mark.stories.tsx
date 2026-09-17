import { bothThemes } from "../../.storybook/bothThemes";
import { Mark } from "./Mark";

export default {
  title: "Primitives/Mark",
  component: Mark,
  decorators: [bothThemes],
};

function Row({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "flex", alignItems: "baseline", gap: "var(--ward-space-2)" }}>{children}</span>;
}

export const Met = {
  render: () => (
    <Row>
      <Mark state="met" label="met" />
      <span style={{ font: "var(--ward-type-body)" }}>Product resolves to a dataset</span>
    </Row>
  ),
};

export const Unmet = {
  render: () => (
    <Row>
      <Mark state="unmet" label="not met" />
      <span style={{ font: "var(--ward-type-body)" }}>Owner has not confirmed the SLA</span>
    </Row>
  ),
};

export const Failed = {
  render: () => (
    <Row>
      <Mark state="failed" label="failed" />
      <span style={{ font: "var(--ward-type-body)" }}>Row count fell outside the agreed bound</span>
    </Row>
  ),
};

/* The three together, which is how the difference reads: met and failed are
   filled and carry a glyph, unmet is an empty box with a hairline. */
export const AllThree = {
  render: () => (
    <Row>
      <Mark state="met" label="met" />
      <Mark state="unmet" label="not met" />
      <Mark state="failed" label="failed" />
    </Row>
  ),
};
