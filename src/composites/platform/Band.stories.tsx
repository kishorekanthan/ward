import { bothThemes } from "../../../.storybook/bothThemes";
import { Chip } from "../../primitives/Chip";
import { Band, type BandCell } from "./Band";

/* Verbatim from the first band of design/Trellis Platform Surface.dc.html; the comp's
   .tick/.gap are not chip roles, so done/warn is a derived mapping. */
const identity: BandCell[] = [
  {
    title: "Claim → role resolution",
    body: "One read at login, resolved to role × stream. Closed role set, no ad-hoc grants.",
    tag: <Chip role="done" label="T-022" />,
  },
  {
    title: "Enforcement map",
    body: "Endpoint → required role, tested as a matrix. Viewer payloads omit cost and trace fields server-side.",
    tag: <Chip role="done" label="T-022" />,
  },
  {
    title: "Act-as-user writes",
    body: "A human's comment goes out on their token so Jira names them; machine work stays on the relay identity.",
    tag: <Chip role="done" label="T-023" />,
  },
  {
    title: "Access review export",
    body: 'Quarterly "who could do what, and who approved it" as a signed artefact. Compliance will ask; nothing produces it.',
    tag: <Chip role="warn" label="GAP" />,
  },
];

const untagged: BandCell[] = identity.map((c) => ({ title: c.title, body: c.body }));

export default {
  title: "Platform/Band",
  component: Band,
  decorators: [bothThemes],
};

export const Default = {
  args: {
    index: "01",
    title: "Identity & access",
    note: "Trellis should never own accounts — only resolve a claim and enforce it.",
    cells: identity,
  },
};

export const NoTags = {
  args: { ...Default.args, cells: untagged },
};

export const LongCellBody = {
  args: {
    ...Default.args,
    cells: [
      {
        title: "Unbroken identifier",
        body: "min-width:0_keeps_this_cell_from_widening_its_track_and_squeezing_the_other_three_1234567890",
      },
      ...identity.slice(1),
    ],
  },
};
