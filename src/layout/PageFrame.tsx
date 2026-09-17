import type { ElementType, ReactNode } from "react";
import s from "./layout.module.css";

export type PageFrameProps = {
  children: ReactNode;
  as?: ElementType;
  inset?: "page" | "none" | "board";
};

export function PageFrame({ children, as: Root = "main", inset = "page" }: PageFrameProps) {
  return (
    <Root className={s.frame} data-ward-page-frame="" data-inset={inset}>
      {children}
    </Root>
  );
}
