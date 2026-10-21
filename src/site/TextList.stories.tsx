import { bothThemes } from "../../.storybook/bothThemes";
import { TextList } from "./TextList";

export default {
  title: "Site/TextList",
  component: TextList,
  decorators: [bothThemes],
};

export const Plain = {
  render: () => (
    <TextList label="Strengths">
      <>Data platforms that scale</>
      <>Cost reviews</>
      <>Teaching and hiring</>
    </TextList>
  ),
};

export const Ruled = {
  render: () => (
    <div style={{ maxInlineSize: "var(--ward-width-rail)" }}>
      <TextList rules label="Recent talks">
        <>Small batches fail small</>
        <>What a warehouse costs</>
        <>Naming things in SQL</>
      </TextList>
    </div>
  ),
};
