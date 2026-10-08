import { useState } from "react";
import { bothThemes } from "../../../.storybook/bothThemes";
import { Btn } from "../../primitives/Btn";
import { Composer } from "./Composer";

export default {
  title: "Item/Composer",
  component: Composer,
  decorators: [bothThemes],
};

const base = {
  placeholder: "Ask the agent a question",
  asUser: "M. Chen",
  onPost: () => {},
  onDraft: () => {},
};

export const Plain = { args: base };
export const Attached = { args: { ...base, attachTo: { label: "FL-229 · Triage", onChange: () => {} } } };
export const WithRequeue = {
  args: { ...base, requeueAfter: { checked: true, agent: "triage v2", onChange: () => {} } },
};
export const Full = {
  args: {
    ...base,
    attachTo: { label: "FL-229 · Triage", onChange: () => {} },
    requeueAfter: { checked: false, agent: "triage v2", onChange: () => {} },
  },
};

const EXAMPLES = ["Which window is late?", "Who owns the triage step?"];

function FilledByExample() {
  const [text, setText] = useState("");
  return (
    <div>
      {EXAMPLES.map((example) => (
        <Btn key={example} variant="ghost" size="sm" onClick={() => setText(example)}>
          {example}
        </Btn>
      ))}
      <Composer {...base} variant="reply" value={text} onChange={setText} />
    </div>
  );
}

export const FilledFromExample = { render: () => <FilledByExample /> };
