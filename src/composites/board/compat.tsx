import { useEffect, useId, useRef, useState, type CSSProperties, type MutableRefObject, type ReactElement, type ReactNode, type RefCallback } from "react";
import { useRovingTabindex } from "../../a11y/useRovingTabindex";
import { duration } from "../../fmt/duration";
import { money } from "../../fmt/money";
import { LiveIndicator } from "../../live/LiveIndicator";
import type { LiveConnection, LiveEvent } from "../../live/types";
import { useBorderFlash, type FlashColour } from "../../live/useBorderFlash";
import { Btn } from "../../primitives/Btn";
import { Checkbox } from "../../primitives/Checkbox";
import { Chip } from "../../primitives/Chip";
import { ConnectionMark } from "../../primitives/ConnectionMark";
import { Field } from "../../primitives/Field";
import { Overlay } from "../../primitives/Overlay";
import { Switch } from "../../primitives/Switch";
import { v, type ChipRole, type StreamStep } from "../../tokens";

export type LegacyLiveFeed = {
  connection: LiveConnection;
  lastEventAt: string | null;
  subscribe: (itemKey: string | "*", handler: (event: LiveEvent) => void) => () => void;
};

export type LegacyBoardItemView = {
  key: string;
  title: string;
  state?: { role: ChipRole; label: string };
  streamStep: StreamStep;
  timeInStage: number;
  waitsOn: string;
  lastAgentAction?: string;
  finding?: string;
  cost?: number;
  jiraKey?: string;
  flagged?: boolean;
  run?: { agent: string; startedAt: string; turn?: [number, number]; lastStep?: string };
  changedAt: string;
};

export type LegacyCardField = "key" | "lastAgentAction" | "cost" | "jiraLink";

export type LegacyCardRoving = { tabIndex: 0 | -1; ref: RefCallback<HTMLButtonElement>; onFocus?: () => void; onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void; "data-ward-roving"?: true };

export type LegacyWorkCardProps = {
  item: LegacyBoardItemView;
  fields?: LegacyCardField[];
  onOpen: (key: string) => void;
  feed: LegacyLiveFeed | null;
  selected?: boolean;
  tabIndex?: 0 | -1;
  connection?: LiveConnection;
  rovingItem?: LegacyCardRoving;
};

function legacyMergeRefs(
  flashRef: MutableRefObject<HTMLButtonElement | null>,
  rovingRef: RefCallback<HTMLButtonElement>,
): RefCallback<HTMLButtonElement> {
  return (element) => {
    flashRef.current = element;
    rovingRef(element);
  };
}

function legacyRowSpan(fields: LegacyCardField[]): number {
  return Math.ceil(fields.length / 2);
}

function legacyLiveFlashColour(type: LiveEvent["type"]): FlashColour {
  if (type === "run.finding") return "orange";
  if (type === "run.finished") return "green";
  return "blue";
}

function legacyEventStepLabel(event: LiveEvent): string | undefined {
  return event.step === undefined ? undefined : event.step.label;
}

function handleLegacyCardEvent(
  event: LiveEvent,
  seen: MutableRefObject<Set<string>>,
  setLiveStep: (step: string) => void,
  flash: (colour: FlashColour) => void,
): void {
  if (seen.current.has(event.id)) return;
  seen.current.add(event.id);
  const label = legacyEventStepLabel(event);
  if (label !== undefined) setLiveStep(label);
  flash(legacyLiveFlashColour(event.type));
}

function useLegacyCardLive(
  feed: LegacyLiveFeed | null,
  itemKey: string,
  seen: MutableRefObject<Set<string>>,
  setLiveStep: (step: string) => void,
  flash: (colour: FlashColour) => void,
): void {
  useEffect(() => {
    if (feed === null) return;
    return feed.subscribe(itemKey, (event) => handleLegacyCardEvent(event, seen, setLiveStep, flash));
  }, [feed, itemKey, seen, setLiveStep, flash]);
}

function legacyInitialStep(item: LegacyBoardItemView): string | undefined {
  return item.run === undefined ? undefined : item.run.lastStep;
}

function legacyCardChip(item: LegacyBoardItemView, running: boolean): { role: ChipRole; label: string } {
  return running ? { role: "running", label: "AGENT WORKING" } : (item.state ?? { role: "pending", label: item.key });
}

function legacyCardMeta(item: LegacyBoardItemView, run: NonNullable<LegacyBoardItemView["run"]> | undefined): string {
  if (run !== undefined) return duration(item.timeInStage) + " · waits on " + run.agent;
  return duration(item.timeInStage) + " · waiting on " + item.waitsOn;
}

function legacyCardStyle(item: LegacyBoardItemView, fields: LegacyCardField[] | undefined): CSSProperties {
  return {
    "--stream": `var(--ward-stream-${item.streamStep}-chip)`,
    minHeight: "calc(" + v.height.card + " + " + v.height.cardRow + " * " + String(legacyRowSpan(fields ?? [])) + ")",
  } as CSSProperties;
}

function legacyCardKey(item: LegacyBoardItemView, fields: LegacyCardField[] | undefined): ReactElement {
  return <span className={(fields ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden"}>{item.key}</span>;
}

function legacyCardCost(item: LegacyBoardItemView, fields: LegacyCardField[] | undefined): ReactNode {
  return item.cost !== undefined && (fields ?? []).includes("cost") ? <Chip role="meta" label={money(item.cost)} /> : null;
}

function legacyCardJira(item: LegacyBoardItemView, fields: LegacyCardField[] | undefined): ReactNode {
  return item.jiraKey !== undefined && (fields ?? []).includes("jiraLink") ? <Chip role="meta" label={item.jiraKey} /> : null;
}

function legacyCardLiveIndicator(
  run: NonNullable<LegacyBoardItemView["run"]> | undefined,
  liveStep: string | undefined,
  connection: LiveConnection | undefined,
  changedAt: string,
): ReactNode {
  if (run === undefined) return null;
  return <LiveIndicator startedAt={run.startedAt} lastEvent={liveStep === undefined ? undefined : { label: liveStep, at: changedAt }} connection={connection ?? "live"} turn={run.turn} />;
}

function legacyCardLastRow(item: LegacyBoardItemView, run: NonNullable<LegacyBoardItemView["run"]> | undefined, liveStep: string | undefined): string {
  return run === undefined ? (item.finding ?? "") : (liveStep ?? "");
}

function legacyCardRef(
  flashRef: MutableRefObject<HTMLButtonElement | null>,
  roving: LegacyCardRoving | undefined,
): MutableRefObject<HTMLButtonElement | null> | RefCallback<HTMLButtonElement> {
  return roving === undefined ? flashRef : legacyMergeRefs(flashRef, roving.ref);
}

function legacyCardRovingProps(props: LegacyWorkCardProps): LegacyCardRoving | { tabIndex: 0 | -1 } {
  return props.rovingItem ?? { tabIndex: props.tabIndex ?? 0 };
}

function legacyDataFlag(value: boolean | undefined): "true" | undefined {
  return value === true ? "true" : undefined;
}

export function LegacyWorkCard(props: LegacyWorkCardProps): ReactElement {
  const item = props.item;
  const run = item.run;
  const running = run !== undefined;
  const ref = useRef<HTMLButtonElement | null>(null);
  const flash = useBorderFlash(ref);
  const seenRef = useRef<Set<string>>(new Set());
  const [liveStep, setLiveStep] = useState<string | undefined>(legacyInitialStep(item));
  useLegacyCardLive(props.feed, item.key, seenRef, setLiveStep, flash);

  const chip = legacyCardChip(item, running);
  const meta = legacyCardMeta(item, run);
  const style = legacyCardStyle(item, props.fields);
  const lastRow = legacyCardLastRow(item, run, liveStep);
  return (
    <li role="listitem" style={{ listStyle: "none" }}>
      <button
        type="button"
        {...legacyCardRovingProps(props)}
        className="ward-workcard"
        data-flagged={legacyDataFlag(item.flagged)}
        data-selected={legacyDataFlag(props.selected)}
        style={style}
        ref={legacyCardRef(ref, props.rovingItem)}
        onClick={() => props.onOpen(item.key)}
      >
        {legacyCardKey(item, props.fields)}
        <span className="ward-workcard-title ward-truncate" title={item.title}>{item.title}</span>
        {item.flagged === true ? <span className="ward-visually-hidden">drift flag</span> : null}
        <span className="ward-chiprow">
          <Chip role={chip.role} label={chip.label} />
          {legacyCardCost(item, props.fields)}
          {legacyCardJira(item, props.fields)}
        </span>
        <span className="ward-workcard-meta ward-truncate" title={meta}>{meta}</span>
        <span className="ward-workcard-lastrow">
          {legacyCardLiveIndicator(run, liveStep, props.connection, item.changedAt)}
          {lastRow !== "" ? <span className="ward-truncate" title={lastRow}>{lastRow}</span> : null}
        </span>
      </button>
    </li>
  );
}

export type LegacyOverCapNoteProps = { count: number; cap: number };

export function LegacyOverCapNote({ count, cap }: LegacyOverCapNoteProps): ReactElement {
  return <p className="ward-overcap" role="status">{String(count) + " items in a column capped at " + String(cap) + " — move " + String(count - cap) + " out or raise the cap"}</p>;
}

export type LegacyBoardColumnDef = { id: string; label: string; cap?: number; gate?: boolean };

export type LegacyBoardColumnProps = {
  column: LegacyBoardColumnDef;
  items: LegacyBoardItemView[];
  fields?: LegacyCardField[];
  onOpen: (key: string) => void;
  selectedKey?: string | null;
  feed: LegacyLiveFeed | null;
  connection?: LiveConnection;
  roving?: { itemProps: (index: number) => LegacyWorkCardProps["rovingItem"] };
};

function legacyColumnOverCap(props: LegacyBoardColumnProps): boolean {
  return props.column.cap !== undefined && props.items.length > props.column.cap;
}

function legacyColumnHeader(column: LegacyBoardColumnDef, itemCount: number, labelId: string): ReactElement {
  return (
    <div className="ward-boardcol-head">
      <span id={labelId} className="ward-boardcol-label" title={column.label}>{column.label}</span>
      <span className="ward-chiprow">{column.gate === true ? <Chip role="gate" label="GATE" /> : null}<Chip role="meta" label={String(itemCount)} /></span>
    </div>
  );
}

function legacyColumnNotice(props: LegacyBoardColumnProps, overCap: boolean): ReactNode {
  if (!overCap || props.column.cap === undefined) return null;
  return <LegacyOverCapNote count={props.items.length} cap={props.column.cap} />;
}

type LegacyColumnRoving = { itemProps: (index: number) => LegacyWorkCardProps["rovingItem"] };

function legacyColumnRoving(props: LegacyBoardColumnProps, local: LegacyColumnRoving): LegacyColumnRoving {
  return props.roving ?? local;
}

function legacyColumnListProps(
  props: LegacyBoardColumnProps,
  local: ReturnType<typeof useRovingTabindex>,
): Record<string, unknown> {
  return props.roving === undefined ? local.containerProps : {};
}

function legacyColumnCards(props: LegacyBoardColumnProps, roving: { itemProps: (index: number) => LegacyWorkCardProps["rovingItem"] }): ReactNode {
  return props.items.map((item, index) => (
    <LegacyWorkCard
      key={item.key}
      item={item}
      fields={props.fields}
      onOpen={props.onOpen}
      selected={item.key === props.selectedKey}
      feed={props.feed}
      connection={props.connection}
      rovingItem={roving.itemProps(index)}
    />
  ));
}

export function LegacyBoardColumn(props: LegacyBoardColumnProps): ReactElement {
  const labelId = useId();
  const local = useRovingTabindex({ orientation: "vertical" });
  const roving = legacyColumnRoving(props, local);
  const overCap = legacyColumnOverCap(props);
  return (
    <section className="ward-boardcol" aria-labelledby={labelId} data-overcap={legacyDataFlag(overCap)} data-gate={legacyDataFlag(props.column.gate)}>
      {legacyColumnHeader(props.column, props.items.length, labelId)}
      {legacyColumnNotice(props, overCap)}
      <ul role="list" className="ward-boardcol-list" {...legacyColumnListProps(props, local)}>
        {legacyColumnCards(props, roving)}
      </ul>
    </section>
  );
}

export type LegacyBoardHeaderProps = {
  stream: { name: string; key: string; streamStep: StreamStep };
  rollups: { inFlight: number; loadedThisWeek: number; agentsWorking: number; p50?: number; p90?: number };
  connection: LiveConnection;
  lastEventAt: string | null;
  owners?: string[];
  owner?: string;
  onOwnerChange?: (owner: string) => void;
  onConfigure?: () => void;
};

function legacyBoardRollup(rollups: LegacyBoardHeaderProps["rollups"]): string {
  let result = "in flight " + String(rollups.inFlight) + " · loaded this week " + String(rollups.loadedThisWeek) + " · agents working " + String(rollups.agentsWorking);
  if (rollups.p50 !== undefined) result += " · p50 " + duration(rollups.p50);
  if (rollups.p90 !== undefined) result += " · p90 " + duration(rollups.p90);
  return result;
}

function legacyBoardOwnerField(props: LegacyBoardHeaderProps): ReactNode {
  if (props.owners === undefined || props.owners.length === 0) return null;
  return <Field kind="select" label="Owner" value={props.owner ?? props.owners[0]} options={props.owners.map((owner) => ({ value: owner, label: owner }))} onChange={props.onOwnerChange} />;
}

function legacyBoardConfigureButton(onConfigure: (() => void) | undefined): ReactNode {
  return onConfigure === undefined ? null : <Btn variant="secondary" size="sm" label="Configure board" onClick={onConfigure} />;
}

export function LegacyBoardHeader(props: LegacyBoardHeaderProps): ReactElement {
  return (
    <header className="ward-boardheader">
      <div><div className="ward-chiprow"><Chip role="stream" label={props.stream.name} streamStep={props.stream.streamStep} /><Chip role="meta" label={props.stream.key} /></div><div className="ward-rollup" aria-live="polite">{legacyBoardRollup(props.rollups)}</div></div>
      <div className="ward-chiprow">
        {legacyBoardOwnerField(props)}
        {legacyBoardConfigureButton(props.onConfigure)}
        <ConnectionMark connection={props.connection} lastEventAt={props.lastEventAt} />
      </div>
    </header>
  );
}

export type LegacyConfigStage = { id: string; name: string; gate?: boolean; terminal?: boolean; agentsMounted?: number };
export type LegacyStageConfig = { label: string; cap?: string; shown: boolean };
export type LegacyConfigRowProps = { stage: LegacyConfigStage; config: LegacyStageConfig; onChange: (config: LegacyStageConfig) => void; onMoveUp?: () => void; onMoveDown?: () => void };

function legacyConfigMandatory(stage: LegacyConfigStage): boolean {
  return stage.gate === true || stage.terminal === true || (stage.agentsMounted ?? 0) > 0;
}

function legacyConfigSwitch(props: LegacyConfigRowProps): ReactElement {
  if (props.stage.gate === true) return <Switch label={props.stage.name + " gate"} checked onChange={undefined} locked />;
  return <Switch label={props.stage.terminal === true ? "terminal stage" : props.stage.name} checked={props.config.shown} onChange={(next) => props.onChange({ ...props.config, shown: next })} />;
}

function legacyConfigBadges(stage: LegacyConfigStage): ReactNode {
  const mounted = stage.agentsMounted ?? 0;
  return <>
    {mounted > 0 ? <Chip role="running" label={String(mounted) + " AGENTS"} /> : null}
    {stage.terminal === true ? <Chip role="soft" label="TERMINAL" /> : null}
  </>;
}

export function LegacyConfigRow(props: LegacyConfigRowProps): ReactElement {
  const stage = props.stage;
  return (
    <div className="ward-configrow" data-mandatory={legacyDataFlag(legacyConfigMandatory(stage))}>
      <span className="ward-configrow-handle" aria-hidden="true">⠿</span>
      <span className="ward-truncate" title={props.config.label}>{props.config.label}</span>
      <span>{legacyConfigSwitch(props)}</span>
      <Field kind="input" label="Cap" mono value={props.config.cap ?? ""} disabled={stage.gate === true} onChange={(next) => props.onChange({ ...props.config, cap: next })} />
      <Checkbox label="Shown on cards" checked={props.config.shown} disabled locked />
      {legacyConfigBadges(stage)}
      <button type="button" className="ward-configrow-handle" aria-label={"Move " + stage.name + " up"} disabled={props.onMoveUp === undefined} onClick={props.onMoveUp}>↑</button>
      <button type="button" className="ward-configrow-handle" aria-label={"Move " + stage.name + " down"} disabled={props.onMoveDown === undefined} onClick={props.onMoveDown}>↓</button>
    </div>
  );
}

export type LegacyPreviewEffect = { met: boolean; text: string };
export type LegacyPreviewRailProps = { sample: LegacyBoardItemView[]; fields?: LegacyCardField[]; cap?: number; gate?: boolean; columnLabel: string; effects: LegacyPreviewEffect[]; onOpen?: (key: string) => void };

export function LegacyPreviewRail(props: LegacyPreviewRailProps): ReactElement {
  const first = props.sample[0];
  return (
    <aside aria-label="Preview" className="ward-previewrail">
      {first !== undefined ? <LegacyWorkCard item={first} fields={props.fields} onOpen={(key) => props.onOpen?.(key)} feed={null} /> : null}
      <LegacyBoardColumn column={{ id: "preview", label: props.columnLabel, cap: props.cap, gate: props.gate }} items={props.sample} fields={props.fields} onOpen={(key) => props.onOpen?.(key)} feed={null} selectedKey={null} />
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>{props.effects.map((effect) => <li key={effect.text} className="ward-effect"><span className={effect.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow"} role="img" aria-label={effect.met ? "met" : "unmet"} /><span>{effect.text}</span></li>)}</ul>
    </aside>
  );
}

export type LegacyDrawerItem = {
  key: string; title: string; state?: { role: ChipRole; label: string }; stream?: { name: string; streamStep: StreamStep }; workflow?: string; timeInStage?: number; waitsOn?: string; agentSay?: string; cost?: number; run?: { agent: string; startedAt: string; turn?: [number, number]; lastStep?: string };
};
export type LegacyItemDrawerProps = { item: LegacyDrawerItem; actions?: ReactNode[]; onClose: () => void; returnFocusTo?: HTMLElement | null; feed?: LegacyLiveFeed | null };

function handleLegacyDrawerEvent(event: LiveEvent, setLiveStep: (step: string) => void): void {
  const label = legacyEventStepLabel(event);
  if (label !== undefined) setLiveStep(label);
}

function useLegacyDrawerLive(
  feed: LegacyLiveFeed | null | undefined,
  itemKey: string,
  setLiveStep: (step: string) => void,
): void {
  useEffect(() => {
    if (feed === undefined || feed === null) return;
    return feed.subscribe(itemKey, (event) => handleLegacyDrawerEvent(event, setLiveStep));
  }, [feed, itemKey, setLiveStep]);
}

function legacyDrawerIdentityRows(item: LegacyDrawerItem): [string, ReactNode][] {
  const rows: [string, ReactNode][] = [["key", item.key]];
  if (item.stream !== undefined) rows.push(["stream", item.stream.name]);
  if (item.workflow !== undefined) rows.push(["workflow", item.workflow]);
  if (item.state !== undefined) rows.push(["state", item.state.label]);
  return rows;
}

function legacyDrawerStageRows(item: LegacyDrawerItem): [string, ReactNode][] {
  const rows: [string, ReactNode][] = [];
  if (item.timeInStage !== undefined) rows.push(["time in stage", duration(item.timeInStage)]);
  if (item.waitsOn !== undefined) rows.push(["waits on", item.waitsOn]);
  if (item.cost !== undefined) rows.push(["cost", money(item.cost)]);
  return rows;
}

function legacyDrawerRun(run: LegacyDrawerItem["run"], liveStep: string | undefined): ReactNode {
  if (run === undefined) return null;
  return <div className="ward-drawer-actions"><LiveIndicator startedAt={run.startedAt} lastEvent={liveStep === undefined ? undefined : { label: liveStep, at: run.startedAt }} connection="live" turn={run.turn} /></div>;
}

function legacyDrawerOptionalContent(item: LegacyDrawerItem, actions: ReactNode[] | undefined): ReactNode {
  return <>
    {item.state !== undefined ? <Chip role={item.state.role} label={item.state.label} /> : null}
    {item.agentSay !== undefined ? <blockquote className="ward-agentsay">{item.agentSay}</blockquote> : null}
    {actions !== undefined && actions.length > 0 ? <div className="ward-drawer-actions">{actions}</div> : null}
  </>;
}

export function LegacyItemDrawer(props: LegacyItemDrawerProps): ReactElement {
  const item = props.item;
  const run = item.run;
  const [liveStep, setLiveStep] = useState<string | undefined>(item.run?.lastStep);
  useLegacyDrawerLive(props.feed, item.key, setLiveStep);
  const kv = [...legacyDrawerIdentityRows(item), ...legacyDrawerStageRows(item)];
  return (
    <Overlay kind="drawer" title={item.title} onClose={props.onClose} returnFocusTo={props.returnFocusTo}>
      <dl className="ward-kv">{kv.map((row) => <div key={row[0]}><dt>{row[0]}</dt><dd className="ward-truncate" title={String(row[1])}>{row[1]}</dd></div>)}
        {legacyDrawerRun(run, liveStep)}
      </dl>
      {legacyDrawerOptionalContent(item, props.actions)}
    </Overlay>
  );
}
