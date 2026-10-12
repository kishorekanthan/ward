import type { ReactNode } from "react";
import { bothThemes } from "../../.storybook/bothThemes";
import { Menu, MenuButton, type MenuEntry } from "./Menu";

const chosen = () => undefined;

const requestTypes: MenuEntry[] = [
  { label: "Story", onSelect: chosen },
  { label: "Bug", onSelect: chosen },
  { label: "Epic", onSelect: chosen },
];

const account: MenuEntry[] = [
  { heading: "Account", items: [{ label: "Settings", onSelect: chosen }, { label: "Profile", onSelect: chosen }] },
  { heading: "Workspace", items: [{ label: "Members", onSelect: chosen }, { label: "Billing", onSelect: chosen }] },
  "separator",
  { label: "Sign out", onSelect: chosen },
];

const help: MenuEntry[] = [
  { label: "Guides", href: "/help/guides" },
  { label: "Keyboard shortcuts", href: "/help/keys" },
  { label: "Release notes", href: "/help/releases" },
];

const describedTypes: MenuEntry[] = [
  { label: "Bring in new data", description: "We connect a new source and load it on a schedule.", onSelect: chosen },
  { label: "Change data we already load", description: "We add, fix or remove fields in a feed you have.", onSelect: chosen },
  { label: "Ask a question", onSelect: chosen },
];

const longDescribedTypes: MenuEntry[] = [
  { label: "Bring in new data", description: "We connect a new source and load it on a schedule. For example: daily sales from the shop tills.", onSelect: chosen },
  { label: "Change data we already load", description: "We add, fix or remove fields in a feed you already have. For example: add the store region to sales.", onSelect: chosen },
  { label: "Not sure? Describe it", description: "Tell us what you need. We pick the type, and you can change it.", onSelect: chosen },
];

// Room below the button keeps an open menu inside its own themed copy.
function Roomy({ children, end = false }: { children: ReactNode; end?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: end ? "flex-end" : "flex-start", minHeight: "calc(var(--ward-space-7) * 10)", maxWidth: "var(--ward-width-form)" }}>
      {children}
    </div>
  );
}

export default {
  title: "Primitives/Menu",
  component: MenuButton,
  decorators: [bothThemes],
};

export const Closed = {
  render: () => (
    <MenuButton label="New request">
      <Menu entries={requestTypes} />
    </MenuButton>
  ),
};

export const Open = {
  render: () => (
    <Roomy>
      <MenuButton label="New request" defaultOpen>
        <Menu entries={requestTypes} />
      </MenuButton>
    </Roomy>
  ),
};

export const GroupsAndFooter = {
  render: () => (
    <Roomy>
      <MenuButton label="Sam Lee" defaultOpen>
        <Menu entries={account} footer="Signed in as Sam Lee" />
      </MenuButton>
    </Roomy>
  ),
};

export const DescribedItems = {
  render: () => (
    <Roomy>
      <MenuButton label="New request" defaultOpen>
        <Menu entries={describedTypes} />
      </MenuButton>
    </Roomy>
  ),
};

// Long descriptions at phone width, on an end-aligned menu whose button sits at the start, as a page header lays it out.
export const PhoneWidthDescribed = {
  render: () => (
    <Roomy>
      <MenuButton label="New request" defaultOpen>
        <Menu entries={longDescribedTypes} align="end" />
      </MenuButton>
    </Roomy>
  ),
};

export const DisabledItem = {
  render: () => (
    <Roomy>
      <MenuButton label="New request" defaultOpen>
        <Menu entries={[...requestTypes, { label: "Incident", disabled: true }]} />
      </MenuButton>
    </Roomy>
  ),
};

export const AlignEnd = {
  render: () => (
    <Roomy end>
      <MenuButton label="Account" defaultOpen>
        <Menu entries={[{ label: "Settings", onSelect: chosen }, { label: "Sign out", onSelect: chosen }]} footer="Signed in as Sam Lee" align="end" />
      </MenuButton>
    </Roomy>
  ),
};

export const LinkItems = {
  render: () => (
    <Roomy>
      <MenuButton label="Help" defaultOpen>
        <Menu entries={help} />
      </MenuButton>
    </Roomy>
  ),
};

const streams: MenuEntry[] = [
  { label: "Data Engineering", href: "#de" },
  { label: "Demo", href: "#demo", current: true },
  { label: "Finance", href: "#finance" },
];

export const CurrentItem = {
  render: () => (
    <Roomy>
      <MenuButton label="Switch stream" defaultOpen>
        <Menu entries={streams} />
      </MenuButton>
    </Roomy>
  ),
};

// A box that clips its overflow, as a top bar or a table cell does; the open menu still shows whole.
export const InsideClippingBox = {
  render: () => (
    <div style={{ overflow: "hidden", padding: "var(--ward-space-1)", maxWidth: "var(--ward-width-form)" }}>
      <MenuButton label="Account">
        <Menu entries={account} />
      </MenuButton>
    </div>
  ),
};
