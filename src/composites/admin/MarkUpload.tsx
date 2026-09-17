import { useRef, useState, type CSSProperties } from "react";
import { Btn } from "../../primitives/Btn";
import s from "./MarkUpload.module.css";

export type ValidationResult = { ok: boolean; reasons: string[] };
export type MarkValidation = { ok: true; svg: string } | { ok: false; reasons: string[] };

const STROKE_LIMIT = 1.5;
const MARK_BOX = 22;
const REJECT_REASONS = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${STROKE_LIMIT}px at ${MARK_BOX}px`] as const;

function invalidSvg(): MarkValidation {
  return { ok: false, reasons: [REJECT_REASONS[1]] };
}

function svgOf(source: string): SVGSVGElement | null {
  try {
    return new DOMParser().parseFromString(source, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}

function fillReasons(svg: SVGSVGElement): string[] {
  const fills = new Set(
    Array.from(svg.querySelectorAll("[fill]"))
      .map((element) => element.getAttribute("fill") ?? "")
      .filter((fill) => fill !== "" && fill !== "none"),
  );
  return fills.size > 1 ? [REJECT_REASONS[0]] : [];
}

function contentReasons(svg: SVGSVGElement, source: string): string[] {
  const reasons: string[] = [];
  if (svg.querySelector("image") !== null) reasons.push(REJECT_REASONS[1]);
  if (svg.querySelector("text") !== null) reasons.push(REJECT_REASONS[2]);
  if (svg.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(source)) reasons.push("script elements or event handlers");
  return reasons;
}

function strokeReasons(svg: SVGSVGElement): string[] {
  const viewBox = (svg.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number);
  const span = Math.max(...viewBox.filter((value) => Number.isFinite(value) && value > 0), 0);
  const scale = span > 0 ? MARK_BOX / span : 1;
  return Array.from(svg.querySelectorAll("[stroke-width]")).some((element) => {
    const width = Number(element.getAttribute("stroke-width"));
    return Number.isFinite(width) && width * scale < STROKE_LIMIT;
  }) ? [REJECT_REASONS[3]] : [];
}

export function validateMark(source: string): MarkValidation {
  const svg = svgOf(source);
  if (svg === null) return invalidSvg();
  const reasons = [...fillReasons(svg), ...contentReasons(svg, source), ...strokeReasons(svg)];
  return reasons.length === 0 ? { ok: true, svg: source } : { ok: false, reasons };
}

type StatusPresentation = {
  idle: string;
  accepted: string;
  rejected: (reasons: string[]) => string;
  classNames: { idle: string; accepted: string; rejected: string };
};

export type MarkUploadPresentation = {
  useInitialsLabel?: string;
  status?: StatusPresentation;
};

export type MarkUploadProps = {
  current?: { svg: string; colour: string };
  onUpload: (file: File) => ValidationResult | Promise<ValidationResult>;
  onUseInitials: () => void;
  presentation?: MarkUploadPresentation;
};

const ACCEPTED = "Mark accepted.";

function Preview({ current }: { current?: MarkUploadProps["current"] }) {
  const src = current ? `data:image/svg+xml;utf8,${encodeURIComponent(current.svg)}` : undefined;
  return (
    <div className={s.preview} style={{ "--mark": current?.colour } as CSSProperties}>
      {src ? <img className={s.mark} src={src} alt="Current mark" /> : <span className={s.empty} />}
    </div>
  );
}

function stateClassName(result: ValidationResult | null, status: StatusPresentation): string {
  const state = result === null ? "idle" : result.ok ? "accepted" : "rejected";
  return status.classNames[state];
}

function statusText(result: ValidationResult | null, status: StatusPresentation): string {
  if (result === null) return status.idle;
  if (result.ok) return status.accepted;
  return status.rejected(result.reasons);
}

function DefaultUploadResult({ result }: { result: ValidationResult | null }) {
  if (result === null) return <div className={s.result} role="status" />;
  if (result.ok && result.reasons.length === 0) {
    return <div className={s.result} role="status"><p className={s.accepted}>{ACCEPTED}</p></div>;
  }
  return (
    <div className={s.result} role="status">
      <ul className={s.reasons} data-rejected={result.ok ? undefined : true}>
        {result.reasons.map((reason) => <li key={reason} className={s.reason}>{reason}</li>)}
      </ul>
    </div>
  );
}

function UploadResult({ result, presentation }: { result: ValidationResult | null; presentation?: MarkUploadPresentation }) {
  const status = presentation?.status;
  if (status === undefined) return <DefaultUploadResult result={result} />;
  return <p className={`${s.result} ${stateClassName(result, status)}`} role="status">{statusText(result, status)}</p>;
}

export function MarkUpload({ current, onUpload, onUseInitials, presentation }: MarkUploadProps) {
  const input = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const chooseFile = (file?: File) => {
    if (file === undefined) return;
    const outcome = onUpload(file);
    if (outcome instanceof Promise) void outcome.then(setResult);
    else setResult(outcome);
  };
  return (
    <div className={s.upload}>
      <Preview current={current} />
      <div className={s.actions}>
        <input
          ref={input}
          className={s.input}
          type="file"
          accept="image/svg+xml"
          aria-label="Mark file"
          onChange={(event) => chooseFile(event.target.files?.[0])}
        />
        <Btn onClick={() => input.current?.click()}>Upload SVG</Btn>
        <Btn variant="ghost" onClick={onUseInitials}>
          {presentation?.useInitialsLabel ?? "Use initials"}
        </Btn>
      </div>
      <UploadResult result={result} presentation={presentation} />
    </div>
  );
}
