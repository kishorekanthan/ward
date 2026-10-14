import { bothThemes } from "../../.storybook/bothThemes";
import { Btn } from "./Btn";
import { Chip, type ChipTone } from "./Chip";

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

const TONES: ChipTone[] = ["neutral", "info", "success", "warning", "danger"];

// The four button ranks and the five chip tones a page picks from.
export const Ranks = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--ward-space-4)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "start", gap: "var(--ward-space-3)" }}>
        <Btn variant="primary">Approve</Btn>
        <Btn variant="secondary">Nudge D. Kovac</Btn>
        <Btn variant="ghost">Back to board</Btn>
        <Btn variant="primary" disabled disabledReason="Ask an Approver on Data Engineering.">
          Override and advance
        </Btn>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "start", gap: "var(--ward-space-3)" }}>
        {TONES.map((tone) => (
          <Chip key={tone} role={tone} label={tone[0].toUpperCase() + tone.slice(1)} />
        ))}
      </div>
    </div>
  ),
};
