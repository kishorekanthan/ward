import { bothThemes } from "../../.storybook/bothThemes";
import { FactList } from "./FactList";
import { SplitLayout } from "./SplitLayout";

export default {
  title: "Site/SplitLayout",
  component: SplitLayout,
  decorators: [bothThemes],
};

const aside = (
  <FactList
    facts={[
      { term: "Role", value: "Lead engineer" },
      { term: "Period", value: "2024 to 2026" },
    ]}
  />
);

const main = (
  <p style={{ margin: 0 }}>
    The nightly job took four hours. We moved it to small batch loads and it now takes twenty minutes. Each batch holds one day of data and retries on its own.
  </p>
);

export const Wide = {
  render: () => (
    <SplitLayout aside={aside} asideLabel="Project facts">
      {main}
    </SplitLayout>
  ),
};

export const Stacked = {
  render: () => (
    <div style={{ maxInlineSize: "var(--ward-width-form)" }}>
      <SplitLayout aside={aside} asideLabel="Project facts">
        {main}
      </SplitLayout>
    </div>
  ),
};
