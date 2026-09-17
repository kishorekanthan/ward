import { bothThemes } from "../../../.storybook/bothThemes";
import { ValidationList, type ValidationCheck } from "./ValidationList";

const checks: ValidationCheck[] = [
  { passed: true, text: "Contrast against the light ground", measured: "5.42:1" },
  { passed: true, text: "Contrast against the dark ground", measured: "4.91:1" },
  { passed: null, text: "Distinct from every live stream mark", runsWhen: "the stream is published" },
];

export default { title: "Admin/ValidationList", component: ValidationList, decorators: [bothThemes] };

export const Mixed = { render: () => <ValidationList checks={checks} /> };
export const AllPassed = { render: () => <ValidationList checks={checks.map((c) => ({ ...c, passed: true }))} /> };
export const Failing = {
  render: () => <ValidationList checks={checks.map((c, i) => (i === 1 ? { ...c, passed: false, measured: "3.10:1" } : c))} />,
};
export const AllPending = {
  render: () => <ValidationList checks={checks.map((c) => ({ ...c, passed: null, measured: undefined, runsWhen: "the stream is published" }))} />,
};
