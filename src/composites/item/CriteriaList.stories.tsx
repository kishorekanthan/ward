import { bothThemes } from "../../../.storybook/bothThemes";
import { CriteriaList } from "./CriteriaList";

export default {
  title: "Item/CriteriaList",
  component: CriteriaList,
  decorators: [bothThemes],
};

export const AllMet = {
  args: {
    criteria: [
      { met: true, text: "Signed off by the data product manager", evidence: "sig:8f21c4" },
      { met: true, text: "Late-arrival window agreed with Ops", evidence: "FL-118" },
    ],
  },
};

export const OneUnmet = {
  args: {
    criteria: [
      { met: true, text: "Signed off by the data product manager", evidence: "sig:8f21c4" },
      { met: false, text: "Late-arrival window agreed with Ops" },
    ],
  },
};

export const UnmetWithReason = {
  args: {
    criteria: [{ met: false, text: "Late-arrival window agreed with Ops", why: "Ops has not replied since 02 Sep" }],
  },
};

export const Empty = {
  args: { criteria: [] },
};
