import { useRef, useState, type CSSProperties } from "react";
import { Btn } from "../../primitives/Btn";
import s from "./MarkUpload.module.css";

export type ValidationResult = { ok: boolean; reasons: string[] };
// ok: the mark meets the style rules; svg is the allow-listed tree serialised, never the raw source.
export type MarkValidation = { ok: true; svg: string } | { ok: false; reasons: string[] };

const STROKE_LIMIT = 1.5;
const MARK_BOX = 22;
const SCRIPT = "script elements or event handlers";
const LINKS = "links or external references";
const REJECT_REASONS = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${STROKE_LIMIT}px at ${MARK_BOX}px`] as const;
const CONTENT_REASONS = [REJECT_REASONS[1], REJECT_REASONS[2], SCRIPT, LINKS];
const ELEMENT_REASONS = new Map<string, string>([
  ["image", REJECT_REASONS[1]],
  ["text", REJECT_REASONS[2]], ["tspan", REJECT_REASONS[2]], ["textPath", REJECT_REASONS[2]],
  ["script", SCRIPT], ["foreignObject", SCRIPT],
  ["a", LINKS], ["use", LINKS], ["style", LINKS], ["feImage", LINKS], ["set", LINKS],
]);
const SVG_NS = "http://www.w3.org/2000/svg";
const XMLNS_NS = "http://www.w3.org/2000/xmlns/";
const ALLOWED_ELEMENTS = new Set([
  "svg", "path", "rect", "circle", "ellipse", "line", "polyline", "polygon", "g", "defs",
  "clipPath", "mask", "linearGradient", "radialGradient", "stop", "title", "desc",
]);
const ALLOWED_ATTRIBUTES = new Set([
  "viewBox", "width", "height", "preserveAspectRatio", "version", "id", "transform",
  "d", "x", "y", "cx", "cy", "r", "rx", "ry", "x1", "y1", "x2", "y2", "fx", "fy", "fr", "points", "pathLength",
  "fill", "fill-rule", "fill-opacity", "opacity", "clip-path", "clip-rule", "clipPathUnits", "mask",
  "maskUnits", "maskContentUnits", "gradientUnits", "gradientTransform", "spreadMethod",
  "offset", "stop-color", "stop-opacity",
]);
const FRAGMENT_URL = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi;
// Once in-mark url(#id) is removed, any url(, string (image-set, src) or CSS escape can name a remote resource.
const REMOTE_REFERENCE = /url\s*\(|['"\\]/i;

function invalidSvg(): MarkValidation {
  return { ok: false, reasons: [REJECT_REASONS[1]] };
}

function isSvgNamespace(node: Element): boolean {
  return node.namespaceURI === SVG_NS;
}

function svgOf(source: string): SVGSVGElement | null {
  try {
    const root = new DOMParser().parseFromString(source, "image/svg+xml").documentElement;
    return root.localName === "svg" && isSvgNamespace(root) ? (root as unknown as SVGSVGElement) : null;
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

function elementReason(element: Element): string | undefined {
  return ELEMENT_REASONS.get(element.localName) ?? (element.localName.startsWith("animate") ? LINKS : undefined);
}

function isRemoteReference(value: string): boolean {
  return REMOTE_REFERENCE.test(value.replace(FRAGMENT_URL, ""));
}

function attributeReason(attribute: Attr): string | undefined {
  if (/^on/i.test(attribute.localName)) return SCRIPT;
  return attribute.localName === "href" || isRemoteReference(attribute.value) ? LINKS : undefined;
}

function contentReasons(svg: SVGSVGElement): string[] {
  const found = new Set<string | undefined>();
  for (const element of [svg, ...Array.from(svg.querySelectorAll("*"))]) {
    found.add(elementReason(element));
    for (const attribute of Array.from(element.attributes)) found.add(attributeReason(attribute));
  }
  return CONTENT_REASONS.filter((reason) => found.has(reason));
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

function isAllowedAttribute(attribute: Attr): boolean {
  if (attribute.namespaceURI === XMLNS_NS) return true;
  const name = attribute.localName;
  return attribute.namespaceURI === null && (ALLOWED_ATTRIBUTES.has(name) || name.startsWith("stroke"));
}

function isKeptChild(child: Node): boolean {
  if (child.nodeType === Node.TEXT_NODE) return true;
  const element = child as Element;
  return child.nodeType === Node.ELEMENT_NODE && isSvgNamespace(element) && ALLOWED_ELEMENTS.has(element.localName);
}

function sanitiseChild(parent: Element, child: Node): void {
  if (!isKeptChild(child)) parent.removeChild(child);
  else if (child.nodeType === Node.ELEMENT_NODE) sanitise(child as Element);
}

function sanitise(element: Element): Element {
  for (const attribute of Array.from(element.attributes)) if (!isAllowedAttribute(attribute)) element.removeAttributeNode(attribute);
  for (const child of Array.from(element.childNodes)) sanitiseChild(element, child);
  return element;
}

function fragmentIds(value: string): string[] {
  return Array.from(value.matchAll(FRAGMENT_URL), (match) => match[2]).filter((id) => id !== "");
}

// FNV-1a of the source, so two different marks inlined on one page never share an id.
function markPrefix(source: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < source.length; index += 1) hash = Math.imul(hash ^ source.charCodeAt(index), 0x01000193);
  return `ward-mark-${(hash >>> 0).toString(36)}`;
}

function referencedIds(elements: Element[], prefix: string): Map<string, string> {
  const ids = new Map<string, string>();
  for (const element of elements) {
    for (const attribute of Array.from(element.attributes)) {
      for (const id of fragmentIds(attribute.value)) if (!ids.has(id)) ids.set(id, `${prefix}-${ids.size}`);
    }
  }
  return ids;
}

function rewriteReferences(element: Element, ids: Map<string, string>): void {
  for (const attribute of Array.from(element.attributes)) {
    attribute.value = attribute.value.replace(FRAGMENT_URL, (match, _quote, id: string) => {
      const renamed = ids.get(id);
      return renamed === undefined ? match : match.replace(`#${id}`, `#${renamed}`);
    });
  }
}

// Only ids a url(#id) names survive, renamed, so an inlined mark never shadows a host global or element.
function rewriteIds(svg: Element, prefix: string): Element {
  const elements = [svg, ...Array.from(svg.querySelectorAll("*"))];
  const ids = referencedIds(elements, prefix);
  for (const element of elements) {
    const renamed = ids.get(element.getAttribute("id") ?? "");
    if (renamed === undefined) element.removeAttribute("id");
    else element.setAttribute("id", renamed);
    rewriteReferences(element, ids);
  }
  return svg;
}

export function validateMark(source: string): MarkValidation {
  const svg = svgOf(source);
  if (svg === null) return invalidSvg();
  const reasons = [...fillReasons(svg), ...contentReasons(svg), ...strokeReasons(svg)];
  if (reasons.length > 0) return { ok: false, reasons };
  return { ok: true, svg: new XMLSerializer().serializeToString(rewriteIds(sanitise(svg), markPrefix(source))) };
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
