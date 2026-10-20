import type { CSSProperties, ReactNode } from "react";
import s from "./FlowChain.module.css";

export type FlowAnimate = "ready" | "run";

export type FlowChainProps = {
  steps: ReactNode[];
  label?: string;
  animate?: FlowAnimate;
};

// Steps in order with a decorative arrow between each. A consumer sets data-ward-animate to ready, then run, to reveal them in turn.
export function FlowChain({ steps, label, animate }: FlowChainProps) {
  return (
    <ol className={s.chain} aria-label={label} data-ward-animate={animate ?? ""}>
      {steps.map((step, i) => (
        <li className={s.step} key={i} style={{ "--ward-step": i } as CSSProperties}>
          {i === 0 ? null : (
            <span className={s.arrow} aria-hidden="true">
              →
            </span>
          )}
          <span className={s.box}>{step}</span>
        </li>
      ))}
    </ol>
  );
}
