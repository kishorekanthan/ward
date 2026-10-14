import { Fragment, useId, type MouseEvent, type ReactNode } from "react";
import { useDisabledScope, type ScopeReason } from "./DisabledScope";
import s from "./Btn.module.css";

export type BtnVariant = "primary" | "destructive" | "secondary" | "ghost" | "overflow";

type Base = {
  variant?: BtnVariant;
  size?: "md" | "sm";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  label?: ReactNode;
  className?: string;
  /** Disclosure state for a button that shows and hides a panel it controls. */
  expanded?: boolean;
  controls?: string;
};

type Available = Base & { disabled?: false; describedBy?: string; disabledReason?: string };
// A disabled button names its reason: an element on the page, its own reason text, or both.
type Unavailable = Base & { disabled: true } & ({ describedBy: string; disabledReason?: string } | { describedBy?: string; disabledReason: string });

export type BtnProps = Available | Unavailable;

function classNames(variant: BtnVariant, size: "md" | "sm", disabled: boolean, className?: string): string {
  const sized = size === "sm" ? [s.sm, "ward-btn--sm"] : [];
  const unavailable = disabled ? [s.disabled] : [];
  return [s.btn, s[variant], "ward-btn", `ward-btn--${variant}`, ...sized, ...unavailable, className ?? ""]
    .filter(Boolean)
    .join(" ");
}

type OverflowAria = { "aria-label"?: string; "aria-haspopup"?: "menu" };

// A disclosure (controls set) is not a menu, so it must not announce one.
function overflowProps(variant: BtnVariant, controls?: string): OverflowAria {
  if (variant !== "overflow") return {};
  return controls ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}

function validate(props: BtnProps, scope: ScopeReason | null): void {
  if (props.disabled && !scope && !props.describedBy && !props.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}

// Inside a disabled scope, the scope's reason replaces the button's own.
function shownReason(props: BtnProps, scope: ScopeReason | null): string | undefined {
  if (scope) return scope.reason;
  return props.disabled ? props.disabledReason : undefined;
}

function joinIds(...ids: (string | undefined)[]): string | undefined {
  return ids.filter(Boolean).join(" ") || undefined;
}

function describedBy(props: BtnProps, reason: string | undefined, reasonId: string): string | undefined {
  return joinIds(props.describedBy, reason && reasonId);
}

// A scope's reason is said once by its page, so only a button's own reason shows as a line under it.
function Reason({ id, reason, shown }: { id: string; reason?: string; shown: boolean }) {
  if (!reason) return null;
  return (
    <span id={id} className={shown ? `${s.reason} ward-btn-reason` : "ward-visually-hidden"}>
      {reason}
    </span>
  );
}

function buttonContent(props: BtnProps): ReactNode {
  return props.children ?? props.label;
}

// A scope that hides actions renders no button at all.
export function Btn(props: BtnProps) {
  return useDisabledScope()?.actions === "hide" ? null : <ShownBtn {...props} />;
}

function ShownBtn(props: BtnProps) {
  const scope = useDisabledScope();
  validate(props, scope);
  const variant = props.variant ?? "secondary";
  const size = props.size ?? "md";
  const disabled = Boolean(props.disabled || scope);
  const reason = shownReason(props, scope);
  const reasonId = useId();
  const Wrap = wrapFor(reason, scope);
  return (
    <Wrap>
      <button
        type={props.type ?? "button"}
        className={classNames(variant, size, disabled, props.className)}
        data-ward-btn={variant}
        data-ward-size={size}
        disabled={disabled}
        title={reason}
        aria-describedby={describedBy(props, reason, reasonId)}
        onClick={props.onClick}
        aria-expanded={props.expanded}
        aria-controls={props.controls}
        {...overflowProps(variant, props.controls)}
      >
        {buttonContent(props)}
      </button>
      <Reason id={reasonId} reason={reason} shown={Wrap === ReasonWrap} />
    </Wrap>
  );
}

// Only a button's own reason earns the wrapper that stacks its line under it.
function wrapFor(reason: string | undefined, scope: ScopeReason | null): typeof ReasonWrap | typeof Fragment {
  return reason && !scope ? ReasonWrap : Fragment;
}

function ReasonWrap({ children }: { children?: ReactNode }) {
  return <span className={`${s.withReason} ward-btn-withReason`}>{children}</span>;
}
