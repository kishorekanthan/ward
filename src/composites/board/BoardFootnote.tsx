import s from "./BoardFootnote.module.css";
import { safeHref } from "../../primitives/safeHref";

export type BoardFootnoteProps = {
  configureHref?: string;
};

export function BoardFootnote({ configureHref }: BoardFootnoteProps) {
  if (configureHref === undefined) return null;
  return (
    <footer className={s.foot} data-ward-board-footnote="">
      <a className={`${s.link} ward-target`} href={safeHref(configureHref)}>
        Configure board
      </a>
    </footer>
  );
}
