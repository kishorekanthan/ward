import { useState } from "react";
import { bothThemes } from "../../.storybook/bothThemes";
import { PeriodPicker, type Period } from "./PeriodPicker";

export default {
  title: "Primitives/PeriodPicker",
  component: PeriodPicker,
  decorators: [bothThemes],
};

function Live({ start }: { start: Period }) {
  const [value, setValue] = useState<Period>(start);
  return <PeriodPicker value={value} onChange={setValue} today="2026-10-28" />;
}

export const Preset = { render: () => <Live start={{ preset: "8w" }} /> };
export const CustomRange = { render: () => <Live start={{ from: "2026-09-01", to: "2026-09-30" }} /> };
