import { useId, useState, type ReactElement } from "react";
import { Btn } from "../../primitives/Btn";
import { Chip } from "../../primitives/Chip";
import { Field } from "../../primitives/Field";
import { Overlay } from "../../primitives/Overlay";
import { Radio } from "../../primitives/Radio";
import { isValidatedStreamStep, type StreamStep } from "../../tokens";
import { ColourLadder, PARTIAL_STEP_REASON, type LadderStep } from "./ColourLadder";
import { StageListEditor } from "./StageListEditor";
import { MoveAnnouncer, MoveButton, moveAnnouncement, moveRow, moveTo, useMoveFocus, type Direction } from "./stageMoves";
import s from "./NewStreamModal.module.css";

export type StageDraft = { id: string; name: string; gate?: boolean };

export type PolicyOption = { value: string; label: string; consequence: string };

export type StreamDraft = {
  name: string;
  key: string;
  streamStep: StreamStep;
  owner: string;
  stages: StageDraft[];
  policy: string;
};

export type NewStreamModalProps = {
  owners: { value: string; label: string }[];
  ladder: LadderStep[];
  takenBy?: Record<number, string>;
  stages?: StageDraft[];
  policies?: PolicyOption[];
  onCreate: (draft: StreamDraft) => void;
  onDraft: (draft: StreamDraft) => void;
  onClose: () => void;
  returnFocusTo?: HTMLElement | null;
};

export type WebStreamStageDraft = { name: string; kind: "entry" | "agent" | "gate" | "terminal" };

export type WebNewStreamDraft = {
  name: string;
  key: string;
  owner: string;
  colourStep: number | null;
  writePolicyMode: "relay" | "direct" | "readonly";
  stages: WebStreamStageDraft[];
};

export type WebNewStreamModalProps = {
  presentation: "web";
  owners: string[];
  ladder: { step: number; name?: string; reserved?: boolean }[];
  takenBy?: Record<number, string>;
  onCreate: (draft: WebNewStreamDraft) => void;
  onDraft?: (draft: WebNewStreamDraft) => void;
  onClose: () => void;
  returnFocusTo?: HTMLElement | null;
};

type NewStreamModalRenderProps = NewStreamModalProps | WebNewStreamModalProps;

const DEFAULT_STAGES: StageDraft[] = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: true },
  { id: "done", name: "Done" },
];

const DEFAULT_POLICIES: PolicyOption[] = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." },
];

const FOOTER_NOTE = "A new stream starts as a draft. Nothing runs on it until you publish it.";

const BLOCKED = "Create is disabled: name the stream and give it a key first.";

const REORDER_NOTE = "reorder with the ↑ ↓ buttons · min 2";

function freeValidatedStep(step: { step: number; reserved?: boolean }, takenBy: Record<number, string>): boolean {
  return !step.reserved && isValidatedStreamStep(step.step) && takenBy[step.step] === undefined;
}

function firstFreeStep(ladder: LadderStep[], takenBy: Record<number, string>): StreamStep {
  const free = ladder.find((step) => freeValidatedStep(step, takenBy));
  return free ? free.step : 1;
}

function StageRows({ stages, onMove }: { stages: StageDraft[]; onMove: (from: number, to: number) => void }) {
  const focus = useMoveFocus<HTMLOListElement>();
  const move = (index: number, direction: Direction) => {
    const to = moveTo(index, direction);
    focus.moved({ id: stages[index].id, direction }, moveAnnouncement(stages[index].name, to, stages.length));
    onMove(index, to);
  };
  return (
    <>
      <ol ref={focus.root} className={s.stages} aria-label="Stages in order">
        {stages.map((stage, i) => (
          <li className={s.stage} key={stage.id} data-gate={stage.gate ? true : undefined}>
            <span className={s.stageIndex}>{String(i + 1).padStart(2, "0")}</span>
            <span className={s.stageName}>{stage.name}</span>
            {stage.gate && <Chip role="gate" label="GATE" />}
            {i > 0 && <MoveButton id={stage.id} name={stage.name} direction="up" onMove={() => move(i, "up")} />}
            {i < stages.length - 1 && <MoveButton id={stage.id} name={stage.name} direction="down" onMove={() => move(i, "down")} />}
          </li>
        ))}
      </ol>
      <MoveAnnouncer text={focus.announcement} />
    </>
  );
}

function Footer({ reason, onCreate, onDraft }: { reason: string | null; onCreate: () => void; onDraft: () => void }) {
  const reasonId = useId();
  return (
    <div className={s.footer}>
      <p className={s.note}>{FOOTER_NOTE}</p>
      {reason && (
        <p className={s.reason} id={reasonId}>
          {reason}
        </p>
      )}
      <div className={s.actions}>
        <Btn variant="secondary" onClick={onDraft}>
          Save draft
        </Btn>
        {reason ? (
          <Btn variant="primary" disabled describedBy={reasonId}>
            Create stream
          </Btn>
        ) : (
          <Btn variant="primary" onClick={onCreate}>
            Create stream
          </Btn>
        )}
      </div>
    </div>
  );
}

function createReason(name: string, key: string) {
  return name !== "" && key !== "" ? null : BLOCKED;
}

function CompactNewStreamModal(props: NewStreamModalProps) {
  const { owners, ladder, takenBy = {}, policies = DEFAULT_POLICIES, onCreate, onDraft, onClose, returnFocusTo } = props;
  const titleId = useId();
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [owner, setOwner] = useState(owners[0].value);
  const [streamStep, setStreamStep] = useState<StreamStep>(() => firstFreeStep(ladder, takenBy));
  const [stages, setStages] = useState<StageDraft[]>(props.stages ?? DEFAULT_STAGES);
  const [policy, setPolicy] = useState(policies[0].value);
  const draft: StreamDraft = { name, key, streamStep, owner, stages, policy };
  const reason = createReason(name, key);

  return (
    <Overlay kind="modal" labelledBy={titleId} onClose={onClose} returnFocusTo={returnFocusTo}>
      <div className={s.body}>
        <h2 className={s.title} id={titleId}>
          New stream
        </h2>
        <fieldset className={s.section}>
          <legend className={s.legend}>Identity</legend>
          <Field kind="input" label="Stream name" value={name} onChange={setName} />
          <Field kind="input" label="Key" value={key} onChange={setKey} mono />
          <Field kind="select" label="Owner" value={owner} onChange={setOwner} options={owners} />
        </fieldset>
        <fieldset className={s.section}>
          <legend className={s.legend}>Colour</legend>
          <ColourLadder label="Stream colour" steps={ladder} value={streamStep} onChange={setStreamStep} takenBy={takenBy} />
        </fieldset>
        <fieldset className={s.section}>
          <legend className={s.legend}>Stages</legend>
          <StageRows stages={stages} onMove={(from, to) => setStages(moveRow(stages, from, to))} />
        </fieldset>
        <Radio legend="Loop policy" options={policies} value={policy} onChange={setPolicy} />
        <Footer reason={reason} onCreate={() => onCreate(draft)} onDraft={() => onDraft(draft)} />
      </div>
    </Overlay>
  );
}

const WEB_POLICIES = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." },
];

const WEB_REASON = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";

function webDraft(name: string, key: string, owner: string, colourStep: number | null, writePolicyMode: string, stages: WebStreamStageDraft[]): WebNewStreamDraft {
  const policy = WEB_POLICIES.find((option) => option.value === writePolicyMode)?.value ?? "relay";
  return { name, key, owner, colourStep, writePolicyMode: policy as WebNewStreamDraft["writePolicyMode"], stages };
}

function validWebDraft(draft: WebNewStreamDraft, takenBy: Record<number, string>): boolean {
  return hasWebIdentity(draft) && hasWebColour(draft, takenBy) && hasNamedWebStages(draft);
}

function hasWebIdentity(draft: WebNewStreamDraft): boolean {
  return draft.name.trim() !== "" && draft.key.trim() !== "" && draft.owner !== "";
}

function hasWebColour(draft: WebNewStreamDraft, takenBy: Record<number, string>): boolean {
  return draft.colourStep !== null && freeValidatedStep({ step: draft.colourStep }, takenBy);
}

function hasNamedWebStages(draft: WebNewStreamDraft): boolean {
  return draft.stages.length >= 2 && draft.stages.every((stage) => stage.name.trim() !== "");
}

export function colourStatus(colourStep: number | null, takenBy: Record<number, string>): string {
  if (colourStep === null) return `Colour: none picked — choose a free validated step; steps 4–6 are ${PARTIAL_STEP_REASON}.`;
  if (!freeValidatedStep({ step: colourStep }, takenBy)) return `Colour: step ${colourStep} cannot be used.`;
  return `Colour: step ${colourStep} — validated and free.`;
}

function WebAgentNote({ stage }: { stage: WebStreamStageDraft | undefined }): ReactElement {
  if (!stage) return <p className={s.webNote}>Add a stage an agent can run on.</p>;
  return <p className={s.webNote}>Next: mount your first agent on <b>{stage.name}</b>. Nothing runs until you publish it.</p>;
}

function WebFooter({ ready, draft, agentStage, onCreate, onDraft, reasonId }: {
  ready: boolean;
  draft: WebNewStreamDraft;
  agentStage: WebStreamStageDraft | undefined;
  onCreate: (draft: WebNewStreamDraft) => void;
  onDraft?: (draft: WebNewStreamDraft) => void;
  reasonId: string;
}): ReactElement {
  return (
    <div className={s.webFooter}>
      <div className={s.webFooterNotes}>
        <WebAgentNote stage={agentStage} />
        {!ready && <p id={reasonId} className={s.reason}>{WEB_REASON}</p>}
      </div>
      {onDraft && <Btn variant="secondary" onClick={() => onDraft(draft)}>Save draft</Btn>}
      {ready ? <Btn variant="primary" onClick={() => onCreate(draft)}>Create stream</Btn> : <Btn variant="primary" disabled describedBy={reasonId}>Create stream</Btn>}
    </div>
  );
}

function WebHeader({ titleId }: { titleId: string }): ReactElement {
  return (
    <header className={s.webHead}>
      <span className={s.kicker}>Studio / Streams</span>
      <h2 id={titleId} className={s.webTitle}>New stream</h2>
    </header>
  );
}

function WebIdentity({ name, setName, streamKey, setKey, colour, owner }: {
  name: string;
  setName: (value: string) => void;
  streamKey: string;
  setKey: (value: string) => void;
  colour: ReactElement;
  owner: ReactElement;
}): ReactElement {
  return (
    <section className={s.webSection}>
      <h3 className={s.kicker}>01 · Identity</h3>
      <div className={s.identityRow}>
        <div className={s.nameCell}><Field variant="form" label="Name" value={name} onChange={setName} /></div>
        <div className={s.keyCell}><Field variant="form" label="Key" value={streamKey} onChange={setKey} mono /></div>
        {colour}
      </div>
      {owner}
    </section>
  );
}

function WebNewStreamModal(props: WebNewStreamModalProps): ReactElement {
  const reasonId = useId();
  const titleId = useId();
  const takenBy = props.takenBy ?? {};
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [owner, setOwner] = useState(props.owners[0] ?? "");
  const [colourStep, setColourStep] = useState<number | null>(null);
  const [policy, setPolicy] = useState("relay");
  const [stages, setStages] = useState<WebStreamStageDraft[]>([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]);
  const draft = webDraft(name, key, owner, colourStep, policy, stages);
  const ready = validWebDraft(draft, takenBy);
  const agentStage = stages.find((stage) => stage.kind === "agent" && stage.name.trim() !== "");
  const colour = (
    <div className={s.colourCell}>
      <span className={s.formLabel}>Colour</span>
      <ColourLadder presentation="swatches" label="Stream colour — validated steps only" steps={props.ladder} value={colourStep} onChange={setColourStep} takenBy={takenBy} />
    </div>
  );
  const ownerField = (
    <>
      <p className={s.colourStatus} data-colour-status="">{colourStatus(colourStep, takenBy)}</p>
      <Field variant="form" kind="select" label="Owner — accountable for every agent published here" value={owner} options={props.owners.map((person) => ({ value: person, label: person }))} onChange={setOwner} />
    </>
  );
  return (
    <Overlay kind="modal" wide flush labelledBy={titleId} onClose={props.onClose} returnFocusTo={props.returnFocusTo}>
      <WebHeader titleId={titleId} />
      <div className={s.webBody}>
        <WebIdentity name={name} setName={setName} streamKey={key} setKey={setKey} colour={colour} owner={ownerField} />
        <section className={s.webSection}>
          <div className={s.sectionHead}>
            <h3 className={s.kicker}>02 · Workflow stages</h3>
            <span className={s.sectionNote}>{REORDER_NOTE}</span>
          </div>
          <StageListEditor stages={stages} onChange={setStages} />
        </section>
        <section className={s.webSection}>
          <Radio variant="cards" legend="03 · Write policy — inherited by every agent on this stream" value={policy} options={WEB_POLICIES} onChange={setPolicy} />
        </section>
        <WebFooter ready={ready} draft={draft} agentStage={agentStage} onCreate={props.onCreate} onDraft={props.onDraft} reasonId={reasonId} />
      </div>
    </Overlay>
  );
}

export function NewStreamModal(props: NewStreamModalRenderProps): ReactElement {
  return "presentation" in props ? <WebNewStreamModal {...props} /> : <CompactNewStreamModal {...props} />;
}
