import s from "./BoardFootnote.module.css";
import { safeHref } from "../../primitives/safeHref";

export type BoardFootnoteProps = {
  configureHref?: string;
};

export function BoardFootnote({ configureHref }: BoardFootnoteProps) {
  return (
    <footer className={s.foot} data-ward-board-footnote="">
      <p className={s.note}>Filters you set are not saved.</p>
      {configureHref === undefined ? null : (
        <a className={`${s.link} ward-target`} href={safeHref(configureHref)}>
          Configure board
        </a>
      )}
    </footer>
  );
}
