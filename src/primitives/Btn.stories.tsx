import { bothThemes } from "../../.storybook/bothThemes";
import { Btn } from "./Btn";

export default {
  title: "Primitives/Btn",
  component: Btn,
  decorators: [bothThemes],
};

export const Primary = {
  args: { variant: "primary", children: "Publish v3" },
};

export const Destructive = {
  args: { variant: "destructive", children: "Override and advance" },
};

export const Secondary = {
  args: { variant: "secondary", children: "Configure board" },
};

export const Ghost = {
  args: { variant: "ghost", children: "Cancel" },
};

export const Overflow = {
  args: { variant: "overflow", children: "···" },
};

export const Small = {
  args: { variant: "secondary", size: "sm", children: "Replay" },
};

export const Disabled = {
  render: () => (
    <div>
      <Btn variant="primary" disabled describedBy="btn-why">
        Publish v3
      </Btn>
      <p id="btn-why">A dry run has to pass before intake-advisor v3 can go live.</p>
    </div>
  ),
};

export const DisabledWithReason = {
  name: "disabled with reason",
  args: { variant: "primary", disabled: true, disabledReason: "A dry run has to pass before intake-advisor v3 can go live.", children: "Publish v3" },
};

export const Submit = {
  args: { variant: "primary", type: "submit", children: "Save the draft" },
};
