import s from "./TypedInputBlock.module.css";

export type TypedLineKind = "field" | "warn" | "ok" | "dim";
/** `tool` remains accepted for consumers of the pre-canonical Ward shape. */
export type TypedLine = { kind: TypedLineKind | "tool"; text: string };

export interface TypedInputBlockProps {
  lines: TypedLine[];
  label?: string;
}

const KIND_WORD: Partial<Record<TypedLineKind, string>> = { warn: "warning", ok: "ok" };

// Warn and ok lines differ from field lines only by ink, so the kind is also spoken.
function KindWord({ kind }: { kind: TypedLineKind }) {
  const word = KIND_WORD[kind];
  return word === undefined ? null : <span className="ward-visually-hidden">{word}</span>;
}

function TypedRow({ line }: { line: TypedLine }) {
  const kind = line.kind === "tool" ? "field" : line.kind;
  return (
    <li className={`${s.line} ward-typed-line ward-typed-line--${kind}`} data-kind={kind}>
      <KindWord kind={kind} />
      <span data-typed-text>{line.text}</span>
    </li>
  );
}

export function TypedInputBlock({ lines, label = "Typed input the agent receives" }: TypedInputBlockProps) {
  return (
    <div className={`${s.block} ward-typed`}>
      <ol className={s.list} aria-label={label}>
        {lines.map((line, index) => (
          <TypedRow line={line} key={`${index}-${line.text}`} />
        ))}
      </ol>
    </div>
  );
}
