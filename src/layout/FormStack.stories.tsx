import { bothThemes } from "../../.storybook/bothThemes";
import { Btn } from "../primitives/Btn";
import { Field } from "../primitives/Field";
import { FormStack } from "./FormStack";

export default {
  title: "Layout/FormStack",
  component: FormStack,
  decorators: [bothThemes],
};

const fields = (
  <>
    <Field label="Agent name" value="triage-bot" mono />
    <Field kind="select" label="Copy from" value="intake" options={[{ value: "intake", label: "intake" }]} />
  </>
);
const actions = (
  <>
    <Btn variant="secondary" label="Cancel" />
    <Btn variant="primary" label="Save draft" />
  </>
);

export const Default = { args: { label: "New agent", children: fields, actions } };

export const WithError = {
  args: {
    label: "New agent",
    actions,
    children: (
      <>
        <Field label="Agent name" value="Triage Bot" invalid="Use lowercase letters, digits and dashes, starting with a letter." mono />
        <Field kind="select" label="Copy from" value="intake" options={[{ value: "intake", label: "intake" }]} />
      </>
    ),
  },
};
