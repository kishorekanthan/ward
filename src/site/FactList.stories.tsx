import { bothThemes } from "../../.storybook/bothThemes";
import { FactList } from "./FactList";
import { Tag } from "./Tag";

export default {
  title: "Site/FactList",
  component: FactList,
  decorators: [bothThemes],
};

export const Facts = {
  render: () => (
    <div style={{ maxInlineSize: "var(--ward-width-rail)" }}>
      <FactList
        facts={[
          { term: "Role", value: "Lead engineer" },
          { term: "Period", value: "2024 to 2026" },
          {
            term: "Stack",
            value: (
              <span style={{ display: "flex", flexWrap: "wrap", gap: "var(--ward-space-1)" }}>
                <Tag label="TypeScript" />
                <Tag label="Postgres" />
              </span>
            ),
          },
        ]}
      />
    </div>
  ),
};
