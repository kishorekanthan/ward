import { bothThemes } from "../../.storybook/bothThemes";
import { Loading } from "./Loading";

export default {
  title: "States/Loading",
  component: Loading,
  decorators: [bothThemes],
};

export const Short = {
  name: "Loading",
  render: () => <Loading label="Loading the data-eng board" startedAt={new Date().toISOString()} />,
};

export const Patient = {
  name: "Loading — past the patience window",
  render: () => <Loading label="Loading the data-eng board" startedAt={new Date(Date.now() - 6_000).toISOString()} />,
};

export const NoStartTime = {
  name: "Loading — start time omitted",
  render: () => <Loading label="Loading the data-eng board" />,
};
