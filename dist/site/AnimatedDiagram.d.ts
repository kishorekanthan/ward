import { DiagramEdge, DiagramNode } from './diagram';
export type { DiagramEdge, DiagramNode } from './diagram';
export type DiagramStep = {
    text: string;
    nodes: string[];
};
export type AnimatedDiagramProps = {
    label: string;
    nodes: DiagramNode[];
    edges: DiagramEdge[];
    steps: DiagramStep[];
};
export declare function AnimatedDiagram({ label, nodes, edges, steps }: AnimatedDiagramProps): import("react").JSX.Element;
