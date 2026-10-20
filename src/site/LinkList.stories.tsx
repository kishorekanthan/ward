import { bothThemes } from "../../.storybook/bothThemes";
import { LinkList } from "./LinkList";

export default {
  title: "Site/LinkList",
  component: LinkList,
  decorators: [bothThemes],
};

export const Related = {
  render: () => (
    <div style={{ maxInlineSize: "var(--ward-width-rail)" }}>
      <LinkList
        label="Related"
        links={[
          { href: "/writing/batch-loads", label: "Why batch loads won", note: "Article, 6 min" },
          { href: "/projects/loader", label: "The loader" },
          { href: "https://example.com/talk", label: "Conference talk", note: "Video, 25 min" },
        ]}
      />
    </div>
  ),
};
