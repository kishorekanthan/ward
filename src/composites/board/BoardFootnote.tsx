import s from "./BoardFootnote.module.css";
import { safeHref } from "../../primitives/safeHref";

export type BoardFootnoteProps = {
  configureHref?: string;
};

export function BoardFootnote({ configureHref }: BoardFootnoteProps) {
  return (
    <footer className={s.foot} data-ward-board-footnote="">
      <p className={s.note}>Columns, labels and caps come from this stream&apos;s board config. Personal filters aren&apos;t saved to it.</p>
      {configureHref === undefined ? null : (
        <a className={`${s.link} ward-target`} href={safeHref(configureHref)}>
          Configure board
        </a>
      )}
    </footer>
  );
}
