import { useRef, type HTMLAttributes, type ReactNode, type RefObject } from "react";
import s from "./OverflowRow.module.css";
import { useEdgeFades } from "./useEdgeFades";

export type OverflowRowProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  label: string;
  children?: ReactNode;
  // Re-measures the edges when the item count changes.
  count?: number;
  as?: "div" | "nav";
  // False when the children take focus themselves and scroll into view, as links in a strip do.
  focusable?: boolean;
  rowRef?: RefObject<HTMLElement | null>;
};

function keyboardProps(focusable: boolean, tag: "div" | "nav") {
  if (!focusable) return {};
  return { role: tag === "nav" ? undefined : "region", tabIndex: 0 };
}

// One sideways strip: a fade on each edge that hides content, a scrollbar on hover, arrow keys once focused.
export function OverflowRow({ label, children, count, as: Tag = "div", focusable = true, rowRef, className, ...rest }: OverflowRowProps) {
  const own = useRef<HTMLElement>(null);
  const ref = rowRef ?? own;
  useEdgeFades(ref, count);
  return (
    <Tag ref={ref as RefObject<HTMLDivElement>} className={[s.row, className].filter(Boolean).join(" ")} aria-label={label} data-ward-overflow-row="" {...keyboardProps(focusable, Tag)} {...rest}>
      {children}
    </Tag>
  );
}
