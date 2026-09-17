import { bothThemes } from "../../.storybook/bothThemes";
import { Tree, TreeRow } from "./Tree";

export default {
  title: "Primitives/Tree",
  component: Tree,
  decorators: [bothThemes],
};

export const Expanded = {
  render: () => (
    <Tree label="Streams">
      <TreeRow index={0} depth={0} label="data-eng" expanded onToggle={() => {}}>
        <TreeRow index={1} depth={1} label="Intake" leaf />
        <TreeRow index={2} depth={1} label="Triage" leaf />
        <TreeRow index={3} depth={1} label="Review" leaf />
      </TreeRow>
      <TreeRow index={4} depth={0} label="front-end" expanded={false} onToggle={() => {}} />
    </Tree>
  ),
};

export const Collapsed = {
  render: () => (
    <Tree label="Streams">
      <TreeRow index={0} depth={0} label="data-eng" expanded={false} onToggle={() => {}}>
        <TreeRow index={1} depth={1} label="Intake" leaf />
      </TreeRow>
      <TreeRow index={2} depth={0} label="front-end" expanded={false} onToggle={() => {}} />
    </Tree>
  ),
};

export const ThreeDeep = {
  render: () => (
    <Tree label="Streams">
      <TreeRow index={0} depth={0} label="integration" expanded onToggle={() => {}}>
        <TreeRow index={1} depth={1} label="Review" expanded onToggle={() => {}}>
          <TreeRow index={2} depth={2} label="reviewer v4" leaf />
        </TreeRow>
      </TreeRow>
    </Tree>
  ),
};

export const Unresolved = {
  render: () => (
    <Tree label="Resolved fields">
      <TreeRow index={0} depth={0} label="Carrier reference" leaf unresolved />
      <TreeRow index={1} depth={0} label="Shipment window" leaf />
    </Tree>
  ),
};

export const Inherited = {
  render: () => (
    <Tree label="Policy">
      <TreeRow index={0} depth={0} label="Gate notifications" leaf inherited />
      <TreeRow index={1} depth={0} label="Digest window" leaf />
    </Tree>
  ),
};
