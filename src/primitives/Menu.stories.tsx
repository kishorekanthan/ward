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
