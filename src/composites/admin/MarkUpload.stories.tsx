import { bothThemes } from "../../../.storybook/bothThemes";
import { MarkUpload } from "./MarkUpload";

const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 2h12v12H2z" fill="white"/></svg>';

const REASONS = [
  "The file is not an SVG.",
  "The mark must be a single path with no embedded raster.",
  "The mark must be square within 2%.",
];

export default { title: "Admin/MarkUpload", component: MarkUpload, decorators: [bothThemes] };

export const Empty = { render: () => <MarkUpload onUpload={() => ({ ok: true, reasons: [] })} onUseInitials={() => {}} /> };

export const WithMark = {
  render: () => (
    <MarkUpload current={{ svg: SVG, colour: "var(--ward-stream-1-id)" }} onUpload={() => ({ ok: true, reasons: [] })} onUseInitials={() => {}} />
  ),
};

export const Rejected = {
  render: () => (
    <MarkUpload current={{ svg: SVG, colour: "var(--ward-stream-2-id)" }} onUpload={() => ({ ok: false, reasons: REASONS })} onUseInitials={() => {}} />
  ),
};

export const Accepted = {
  render: () => <MarkUpload current={{ svg: SVG, colour: "var(--ward-stream-3-id)" }} onUpload={() => ({ ok: true, reasons: [] })} onUseInitials={() => {}} />,
};
