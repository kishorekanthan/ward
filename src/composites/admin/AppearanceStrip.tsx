import type { CSSProperties, ReactElement } from "react";
import { Chip } from "../../primitives/Chip";
import { Marker } from "../../primitives/Marker";
import { WorkCard } from "../board/WorkCard";
import type { BoardItem } from "../board/types";
import { isStreamStep, streamChip, v, type StreamStep } from "../../tokens";
import s from "./AppearanceStrip.module.css";

export type Identity = { name: string; key: string; streamStep: StreamStep };
export type AppearanceIdentity = { name: string; key: string; streamStep: number | null };

export type AppearanceStripProps = {
  draft: Identity;
  sample: BoardItem;
  streams: Identity[];
  onOpen?: (key: string) => void;
  presentation?: "compact" | "detailed";
  identities?: AppearanceIdentity[];
};

const SEGMENTS: StreamStep[] = [1, 2, 3, 4, 5, 6];
const SEGMENT_WIDTH = 100;

function fillOf(step: StreamStep, taken: Set<number>) {
  return taken.has(step) ? `var(--ward-stream-${step}-id, var(--ward-color-line2))` : "var(--ward-color-line)";
}

function CompactChart({ draft, streams }: { draft: Identity; streams: Identity[] }) {
  const taken = new Set<number>([draft.streamStep, ...streams.map((i) => i.streamStep)]);
  return (
    <svg className={s.chart} viewBox="0 0 600 8" preserveAspectRatio="none" role="img" aria-label="Stream colours in use">
      {SEGMENTS.map((step, i) => (
        <rect
          key={step}
          className={s.segment}
          x={i * SEGMENT_WIDTH}
          y="0"
          width={SEGMENT_WIDTH}
          height="8"
          fill={fillOf(step, taken)}
          data-draft={step === draft.streamStep ? true : undefined}
        />
      ))}
    </svg>
  );
}

function fillFor(step: number | null): string {
  return step !== null && isStreamStep(step) ? streamChip(step) : v.color.line2;
}

function detailedIdentities(identities: AppearanceIdentity[]): AppearanceIdentity[] {
  const segments = identities.slice(0, SEGMENTS.length);
  while (segments.length < SEGMENTS.length) segments.push({ key: "—", name: "unclaimed", streamStep: null });
  return segments;
}

function DetailedChart({ identities }: { identities: AppearanceIdentity[] }): ReactElement {
  return (
    <figure className={`${s.detailedChart} ward-appearance-chart`}>
      <svg viewBox="0 0 600 40" role="img" aria-label="Overview chart segments">
        {identities.map((identity, index) => (
          <rect
            key={identity.key + String(index)}
            x={String(index * SEGMENT_WIDTH)}
            y="0"
            width={String(SEGMENT_WIDTH)}
            height="40"
            style={{ fill: fillFor(identity.streamStep) }}
          />
        ))}
      </svg>
      <figcaption className="ward-seglabels">
        {identities.map((identity, index) => <span key={identity.key + String(index)} className="ward-seglabel" title={identity.name}>{identity.key}</span>)}
      </figcaption>
    </figure>
  );
}

// Cards also hand back their hit button; this strip's contract stays key-only.
function keyOnly(onOpen?: (key: string) => void): (key: string) => void {
  return (key) => onOpen?.(key);
}

function DetailedAppearance(props: AppearanceStripProps): ReactElement {
  const identities = detailedIdentities(props.identities ?? [props.draft, ...props.streams]);
  const draft = identities[0];
  return (
    <section className={`${s.strip} ward-appearance`} aria-label="Appearance">
      <WorkCard item={props.sample} onOpen={keyOnly(props.onOpen)} feed={null} />
      <p className={`${s.head} ward-envrow ward-appearance-head`}>
        <span className="ward-identity" aria-hidden="true" />
        {draft.streamStep !== null && isStreamStep(draft.streamStep) ? <Chip role="stream" label={draft.key} streamStep={draft.streamStep} /> : <Chip role="meta" label={draft.key} />}
        <span className={`${s.name} ward-rowlink`}>{draft.name}</span>
      </p>
      <p className="ward-checklist-note">This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on.</p>
      <DetailedChart identities={identities} />
    </section>
  );
}

function CompactAppearance({ draft, sample, streams, onOpen }: AppearanceStripProps): ReactElement {
  const style = { "--stream": `var(--ward-stream-${draft.streamStep}-id)` } as CSSProperties;
  return (
    <section className={s.strip} aria-label="Appearance" style={style}>
      <div className={s.head}>
        <Marker size={8} kind="stream" />
        <span className={s.name}>{draft.name}</span>
        <Chip role="stream" label={draft.key} streamStep={draft.streamStep} />
      </div>
      <WorkCard item={{ ...sample, streamStep: draft.streamStep }} onOpen={keyOnly(onOpen)} />
      <CompactChart draft={draft} streams={streams} />
    </section>
  );
}

export function AppearanceStrip(props: AppearanceStripProps): ReactElement {
  return props.presentation === "detailed" ? <DetailedAppearance {...props} /> : <CompactAppearance {...props} />;
}
