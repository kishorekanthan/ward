import { useId, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { Chip } from "../../primitives/Chip";
import { Marker } from "../../primitives/Marker";
import { WorkCard } from "../board/WorkCard";
import type { BoardItem } from "../board/types";
import { streamChipProps, streamColour, validatedStep } from "../../primitives/streamColour";
import type { StreamStep } from "../../tokens";
import s from "./AppearanceStrip.module.css";

export type Identity = { name: string; key: string; streamStep: StreamStep | null };
export type AppearanceIdentity = { name: string; key: string; streamStep: number | null };

export type AppearanceStripProps = {
  draft: Identity;
  sample?: BoardItem;
  // Board card's sentence when there is no sample to draw (detailed presentation).
  sampleEmpty?: string;
  streams: Identity[];
  onOpen?: (key: string) => void;
  presentation?: "compact" | "detailed";
  identities?: AppearanceIdentity[];
};

const SAMPLE_EMPTY = "No item in flight to preview.";
const CHART_NOTE = "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on.";
const NOT_THEMEABLE =
  "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark — not a theme. Two teams theming the same product produces two products.";

const SEGMENTS: StreamStep[] = [1, 2, 3, 4, 5, 6];
const SEGMENT_WIDTH = 100;

function fillOf(step: StreamStep, taken: Set<number | null>) {
  return taken.has(step) ? streamColour(step, "id") : "var(--ward-color-line)";
}

function CompactChart({ draft, streams }: { draft: Identity; streams: Identity[] }) {
  const taken = new Set<number | null>([draft.streamStep, ...streams.map((i) => i.streamStep)]);
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
            style={{ fill: streamColour(identity.streamStep, "chip") }}
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

function RailSection({ label, children }: { label: string; children: ReactNode }): ReactElement {
  const id = useId();
  return (
    <section className={s.section} aria-labelledby={id}>
      <h4 id={id} className={s.label}>{label}</h4>
      {children}
    </section>
  );
}

function BoardCardPreview({ sample, sampleEmpty, draft, onOpen }: Omit<AppearanceStripProps, "draft"> & { draft: AppearanceIdentity }): ReactElement {
  if (sample === undefined) return <p className={s.note}>{sampleEmpty ?? SAMPLE_EMPTY}</p>;
  return <WorkCard item={{ ...sample, streamStep: validatedStep(draft.streamStep) }} onOpen={keyOnly(onOpen)} feed={null} />;
}

function IndexRowPreview({ draft }: { draft: AppearanceIdentity }): ReactElement {
  const style = { "--stream": streamColour(draft.streamStep, "id") } as CSSProperties;
  return (
    <p className={s.head} style={style}>
      <Marker size={8} kind="stream" />
      <span className={s.name}>{draft.name}</span>
      <Chip {...streamChipProps(draft.key, draft.streamStep)} />
    </p>
  );
}

function DetailedAppearance(props: AppearanceStripProps): ReactElement {
  const identities = detailedIdentities(props.identities ?? [props.draft, ...props.streams]);
  const draft = identities[0];
  return (
    <div className={s.rail} role="group" aria-label="Appearance">
      <RailSection label="Board card">
        <BoardCardPreview {...props} draft={draft} />
      </RailSection>
      <RailSection label="Streams index row">
        <IndexRowPreview draft={draft} />
      </RailSection>
      <RailSection label="Overview chart segment">
        <DetailedChart identities={identities} />
        <p className={s.note}>{CHART_NOTE}</p>
      </RailSection>
      <RailSection label="Not themeable">
        <p className={s.note}>{NOT_THEMEABLE}</p>
      </RailSection>
    </div>
  );
}

function CompactAppearance({ draft, sample, streams, onOpen }: AppearanceStripProps): ReactElement {
  const style = { "--stream": streamColour(draft.streamStep, "id") } as CSSProperties;
  return (
    <section className={s.strip} aria-label="Appearance" style={style}>
      <div className={s.head}>
        <Marker size={8} kind="stream" />
        <span className={s.name}>{draft.name}</span>
        <Chip {...streamChipProps(draft.key, draft.streamStep)} />
      </div>
      {sample === undefined ? null : <WorkCard item={{ ...sample, streamStep: draft.streamStep }} onOpen={keyOnly(onOpen)} />}
      <CompactChart draft={draft} streams={streams} />
    </section>
  );
}

export function AppearanceStrip(props: AppearanceStripProps): ReactElement {
  return props.presentation === "detailed" ? <DetailedAppearance {...props} /> : <CompactAppearance {...props} />;
}
