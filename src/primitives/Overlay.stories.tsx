import { overlayThemes } from "../../.storybook/overlayThemes";
import { Btn } from "./Btn";
import { Overlay } from "./Overlay";

function Body({ id, title }: { id: string; title: string }) {
  return (
    <div>
      <h2 id={id}>{title}</h2>
      <p>FL-229 waits on A. Whyte. Nothing here is written until you confirm.</p>
      <Btn variant="primary" onClick={() => {}}>
        Confirm
      </Btn>
    </div>
  );
}

export default {
  title: "Primitives/Overlay",
  component: Overlay,
  decorators: [overlayThemes],
};

export const Drawer = {
  render: () => (
    <Overlay kind="drawer" labelledBy="overlay-drawer-title" onClose={() => {}} returnFocusTo={null}>
      <Body id="overlay-drawer-title" title="FL-229" />
    </Overlay>
  ),
};

export const Sheet = {
  render: () => (
    <Overlay kind="sheet" labelledBy="overlay-sheet-title" onClose={() => {}} returnFocusTo={null}>
      <Body id="overlay-sheet-title" title="Requeue triage v2" />
    </Overlay>
  ),
};

export const Modal = {
  render: () => (
    <Overlay kind="modal" labelledBy="overlay-modal-title" onClose={() => {}} returnFocusTo={null}>
      <Body id="overlay-modal-title" title="New stream" />
    </Overlay>
  ),
};
