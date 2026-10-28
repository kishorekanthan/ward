import { useId, useState, type ReactElement, type ReactNode } from "react";
import { Btn } from "../../primitives/Btn";
import { Chip } from "../../primitives/Chip";
import { Field } from "../../primitives/Field";
import { Overlay } from "../../primitives/Overlay";
import { Radio } from "../../primitives/Radio";
import { isValidatedStreamStep, type StreamStep } from "../../tokens";
import { ColourLadder, type LadderStep } from "./ColourLadder";
import { StageListEditor } from "./StageListEditor";
import { MoveAnnouncer, MoveButton, moveAnnouncement, moveRow, moveTo, useMoveFocus, type Direction } from "./stageMoves";
import { repeatsName } from "../../primitives/kindTag";
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
  /** Fields the consumer owns, shown after Identity; their state stays with the consumer. */
  fields?: ReactNode;
};

type NewStreamModalRenderProps = NewStreamModalProps | WebNewStreamModalProps;

const DEFAULT_STAGES: StageDraft[] = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: true },
  { id: "done", name: "Done" },
];

function ReviewTag({ stage }: { stage: { name: string; gate?: boolean } }) {
  return stage.gate && !repeatsName(stage.name, "Review") ? <Chip role="gate" label="Review" /> : null;
}

const DEFAULT_POLICIES: PolicyOption[] = [
  { value: "advance", label: "Move on when all checks pass", consequence: "No one needs to approve." },
  { value: "review", label: "Hold every item for review", consequence: "Every item waits for a reviewer." },
  { value: "block", label: "Stop on any finding", consequence: "A finding holds the item until a person clears it." },
];

const FOOTER_NOTE = "Nothing runs until you publish.";

const BLOCKED = "Add a name and a key.";

const REORDER_NOTE = "At least 2 stages";

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
            <ReviewTag stage={stage} />
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
          <Field kind="input" label="Name" value={name} onChange={setName} />
          <Field kind="input" label="Key" value={key} onChange={setKey} mono />
          <Field kind="select" label="Owner" value={owner} onChange={setOwner} options={owners} />
        </fieldset>
        <fieldset className={s.section}>
          <legend className={s.legend}>Colour</legend>
          <ColourLadder label="Colour" steps={ladder} value={streamStep} onChange={setStreamStep} takenBy={takenBy} />
        </fieldset>
        <fieldset className={s.section}>
          <legend className={s.legend}>Stages</legend>
          <StageRows stages={stages} onMove={(from, to) => setStages(moveRow(stages, from, to))} />
        </fieldset>
        <Radio legend="When items move on" options={policies} value={policy} onChange={setPolicy} />
        <Footer reason={reason} onCreate={() => onCreate(draft)} onDraft={() => onDraft(draft)} />
      </div>
    </Overlay>
  );
}

const WEB_POLICIES = [
  { value: "relay", label: "Through Trellis (safe default)", consequence: "Agents never write to Foundry or Jira directly." },
  { value: "direct", label: "Directly, each agent approved", consequence: "A second admin approves each agent." },
  { value: "readonly", label: "Read only", consequence: "Agents can read and report only." },
];

const WEB_REASON = "Add a name, key, owner and two stages.";

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

// The colour is optional: a stream with none draws neutral and can take one later.
function hasWebColour(draft: WebNewStreamDraft, takenBy: Record<number, string>): boolean {
  return draft.colourStep === null || freeValidatedStep({ step: draft.colourStep }, takenBy);
}

function hasNamedWebStages(draft: WebNewStreamDraft): boolean {
  return draft.stages.length >= 2 && draft.stages.every((stage) => stage.name.trim() !== "");
}

export function colourStatus(colourStep: number | null, takenBy: Record<number, string>): string {
  // Only a colour that cannot be used earns a line; the swatch shows every other state.
  if (colourStep === null || freeValidatedStep({ step: colourStep }, takenBy)) return "";
  return `Colour ${colourStep} can't be used.`;
}

function WebFooter({ ready, draft, onCreate, onDraft, reasonId }: {
  ready: boolean;
  draft: WebNewStreamDraft;
  onCreate: (draft: WebNewStreamDraft) => void;
  onDraft?: (draft: WebNewStreamDraft) => void;
  reasonId: string;
}): ReactElement {
  return (
    <div className={s.webFooter}>
      <div className={s.webFooterNotes}>
        <p className={s.webNote}>{FOOTER_NOTE}</p>
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
      <h3 className={s.kicker}>Identity</h3>
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
  const colour = (
    <div className={s.colourCell}>
      <span className={s.formLabel}>Colour</span>
      <ColourLadder presentation="swatches" label="Colour" steps={props.ladder} value={colourStep} onChange={setColourStep} takenBy={takenBy} />
    </div>
  );
  const ownerField = (
    <>
      {colourStatus(colourStep, takenBy) && <p className={s.colourStatus} data-colour-status="">{colourStatus(colourStep, takenBy)}</p>}
      <Field variant="form" kind="select" label="Owner" value={owner} options={props.owners.map((person) => ({ value: person, label: person }))} onChange={setOwner} />
    </>
  );
  return (
    <Overlay kind="modal" wide flush labelledBy={titleId} onClose={props.onClose} returnFocusTo={props.returnFocusTo}>
      <WebHeader titleId={titleId} />
      <div className={s.webBody}>
        <WebIdentity name={name} setName={setName} streamKey={key} setKey={setKey} colour={colour} owner={ownerField} />
        {props.fields && <section className={s.webSection} data-stream-fields="">{props.fields}</section>}
        <section className={s.webSection}>
          <div className={s.sectionHead}>
            <h3 className={s.kicker}>Stages</h3>
            <span className={s.sectionNote}>{REORDER_NOTE}</span>
          </div>
          <StageListEditor stages={stages} onChange={setStages} />
        </section>
        <section className={s.webSection}>
          <Radio variant="cards" legend="How agents write" value={policy} options={WEB_POLICIES} onChange={setPolicy} />
        </section>
        <WebFooter ready={ready} draft={draft} onCreate={props.onCreate} onDraft={props.onDraft} reasonId={reasonId} />
      </div>
    </Overlay>
  );
}

export function NewStreamModal(props: NewStreamModalRenderProps): ReactElement {
  return "presentation" in props ? <WebNewStreamModal {...props} /> : <CompactNewStreamModal {...props} />;
}
