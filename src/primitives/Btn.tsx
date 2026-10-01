import { useId, type ReactNode } from "react";
import s from "./Btn.module.css";

export type BtnVariant = "primary" | "secondary" | "ghost" | "overflow";

type Base = {
  variant?: BtnVariant;
  size?: "md" | "sm";
  onClick?: () => void;
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

function validate(props: BtnProps): void {
  if (props.disabled && !props.describedBy && !props.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}

function shownReason(props: BtnProps): string | undefined {
  return props.disabled ? props.disabledReason : undefined;
}

function joinIds(...ids: (string | undefined)[]): string | undefined {
  return ids.filter(Boolean).join(" ") || undefined;
}

function describedBy(props: BtnProps, reason: string | undefined, reasonId: string): string | undefined {
  return joinIds(props.describedBy, reason && reasonId);
}

function Reason({ id, reason }: { id: string; reason?: string }) {
  return reason ? (
    <span id={id} className="ward-visually-hidden">
      {reason}
    </span>
  ) : null;
}

function buttonContent(props: BtnProps): ReactNode {
  return props.children ?? props.label;
}

export function Btn(props: BtnProps) {
  validate(props);
  const variant = props.variant ?? "secondary";
  const size = props.size ?? "md";
  const disabled = props.disabled ?? false;
  const reason = shownReason(props);
  const reasonId = useId();
  return (
    <>
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
      <Reason id={reasonId} reason={reason} />
    </>
  );
}
