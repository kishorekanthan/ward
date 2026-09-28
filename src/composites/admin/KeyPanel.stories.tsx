import { useState } from "react";
import { bothThemes } from "../../../.storybook/bothThemes";
import { Btn } from "../../primitives/Btn";
import { KeyPanel } from "./KeyPanel";

function Panel({ status, note, set }: { status: string; note?: string; set: boolean }) {
  const [value, setValue] = useState("");
  const actions = (
    <>
      <Btn label={set ? "Replace key" : "Save key"} />
      {set ? <Btn variant="secondary" label="Remove key" /> : null}
      <Btn variant="secondary" label="Test" />
    </>
  );
  return <KeyPanel label="Provider key" status={status} value={value} onChange={setValue} actions={actions} note={note} />;
}

export default { title: "Admin/KeyPanel", component: KeyPanel, decorators: [bothThemes] };

export const NoKey = { render: () => <Panel status="No key set." set={false} /> };

export const KeySet = { render: () => <Panel status="Set, ends in 4f2a, updated by ada on 28 Sep 11:02." set /> };

export const OutcomeNote = { render: () => <Panel status="Set, ends in 4f2a, updated by ada on 28 Sep 11:02." note="Working. The provider answered." set /> };
