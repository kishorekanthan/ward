import type { ReactNode } from "react";
import { safeHref } from "../primitives/safeHref";
import { Eyebrow } from "./Eyebrow";
import s from "./Hero.module.css";

export type HeroAction = { href: string; label: string };

export type HeroProps = {
  title: ReactNode;
  eyebrow?: string;
  lead?: ReactNode;
  actions?: HeroAction[];
  visual?: ReactNode;
};

// The first action is the main one; the rest are quiet.
function Actions({ actions }: { actions: HeroAction[] }) {
  if (actions.length === 0) return null;
  return (
    <div className={s.actions}>
      {actions.map((action, i) => (
        <a key={`${action.href}-${action.label}`} className={`${s.action} ${i === 0 ? s.primary : s.secondary}`} href={safeHref(action.href)}>
          {action.label}
        </a>
      ))}
    </div>
  );
}

function Text({ title, eyebrow, lead, actions = [] }: Omit<HeroProps, "visual">) {
  return (
    <div className={s.text}>
      {eyebrow === undefined ? null : <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className={s.title}>{title}</h1>
      {lead === undefined ? null : <p className={s.lead}>{lead}</p>}
      <Actions actions={actions} />
    </div>
  );
}

// A home page's opening: the headline is the page's h1, with an optional visual beside the text.
export function Hero({ visual, ...text }: HeroProps) {
  return (
    <div className={s.hero} data-visual={visual === undefined ? "none" : "beside"}>
      <Text {...text} />
      {visual === undefined ? null : <div className={s.visual}>{visual}</div>}
    </div>
  );
}
