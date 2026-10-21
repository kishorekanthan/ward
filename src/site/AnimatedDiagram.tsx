import { useId, useState } from "react";
import { Btn } from "../primitives/Btn";
import { canvasSize, edgeSegment, nodeBox, NODE, type DiagramEdge, type DiagramNode } from "./diagram";
import { useMotionAllowed } from "./useMotionAllowed";
import s from "./AnimatedDiagram.module.css";

export type { DiagramEdge, DiagramNode } from "./diagram";
export type DiagramStep = { text: string; nodes: string[] };

export type AnimatedDiagramProps = {
  label: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  steps: DiagramStep[];
};

type Lit = (id: string) => boolean;

function Edges({ nodes, edges, lit, marker }: { nodes: DiagramNode[]; edges: DiagramEdge[]; lit: Lit; marker: string }) {
  const byId = new Map(nodes.map((n) => [n.id, nodeBox(n)]));
  return edges.map((edge) => {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (from === undefined || to === undefined) return null;
    const active = lit(edge.from) && lit(edge.to);
    return <line key={`${edge.from}>${edge.to}`} className={s.edge} data-active={active} {...edgeSegment(from, to)} markerEnd={`url(#${marker})`} />;
  });
}

function Nodes({ nodes, lit }: { nodes: DiagramNode[]; lit: Lit }) {
  return nodes.map((node) => {
    const box = nodeBox(node);
    return (
      <g key={node.id} className={s.node} data-active={lit(node.id)} data-node={node.id}>
        <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="8" />
        <text x={box.x + NODE.w / 2} y={box.y + NODE.h / 2}>
          {node.label}
        </text>
      </g>
    );
  });
}

type StepBtnProps = { label: string; to: number; count: number; go: (to: number) => void; status: string };

// Back and Next: off at the ends of the walk, described by the step status that says why.
function StepBtn({ label, to, count, go, status }: StepBtnProps) {
  if (to < 0 || to >= count) {
    return (
      <Btn size="sm" disabled describedBy={status}>
        {label}
      </Btn>
    );
  }
  return (
    <Btn size="sm" onClick={() => go(to)}>
      {label}
    </Btn>
  );
}

type ControlsProps = { at: number; count: number; text: string; go: (to: number) => void };

function Controls({ at, count, text, go }: ControlsProps) {
  const status = useId();
  return (
    <div className={s.controls}>
      <StepBtn label="Back" to={at - 1} count={count} go={go} status={status} />
      <StepBtn label="Next" to={at + 1} count={count} go={go} status={status} />
      <p className={s.live} id={status} aria-live="polite">{`Step ${at + 1} of ${count}: ${text}`}</p>
    </div>
  );
}

// A diagram of nodes on a grid with numbered steps; with motion welcome, Back and Next walk the steps one at a time.
export function AnimatedDiagram({ label, nodes, edges, steps }: AnimatedDiagramProps) {
  const live = useMotionAllowed() && steps.length > 0;
  const [at, setAt] = useState(0);
  const titleId = useId();
  const lit: Lit = (id) => live && steps[at].nodes.includes(id);
  const size = canvasSize(nodes);
  return (
    <figure className={s.diagram} data-live={live} aria-labelledby={titleId}>
      <figcaption className={s.label} id={titleId}>
        {label}
      </figcaption>
      <svg className={s.svg} viewBox={`0 0 ${size.w} ${size.h}`} width={size.w} height={size.h} aria-hidden="true">
        <defs>
          <marker id={`${titleId}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
            <path className={s.arrow} d="M0 0 L8 4 L0 8 z" />
          </marker>
        </defs>
        <Edges nodes={nodes} edges={edges} lit={lit} marker={`${titleId}-arrow`} />
        <Nodes nodes={nodes} lit={lit} />
      </svg>
      {live ? <Controls at={at} count={steps.length} text={steps[at].text} go={setAt} /> : null}
      <ol className={s.steps}>
        {steps.map((step, i) => (
          <li key={i} aria-current={live && i === at ? "step" : undefined}>
            {step.text}
          </li>
        ))}
      </ol>
    </figure>
  );
}
