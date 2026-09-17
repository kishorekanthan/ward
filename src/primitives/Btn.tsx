import type { ReactNode } from "react";
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
};

export type BtnProps = (Base & { disabled?: false; describedBy?: string }) | (Base & { disabled: true; describedBy: string });

function classNames(variant: BtnVariant, size: "md" | "sm", disabled: boolean, className?: string): string {
  const sized = size === "sm" ? [s.sm, "ward-btn--sm"] : [];
  const unavailable = disabled ? [s.disabled] : [];
  return [s.btn, s[variant], "ward-btn", `ward-btn--${variant}`, ...sized, ...unavailable, className ?? ""]
    .filter(Boolean)
    .join(" ");
}

function overflowProps(variant: BtnVariant): { "aria-label"?: string; "aria-haspopup"?: "menu" } {
  return variant === "overflow" ? { "aria-label": "More actions", "aria-haspopup": "menu" } : {};
}

function validate(props: BtnProps): void {
  if (props.disabled && !props.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}

function buttonContent(props: BtnProps): ReactNode {
  return props.children ?? props.label;
}

export function Btn(props: BtnProps) {
  validate(props);
  const variant = props.variant ?? "secondary";
  const size = props.size ?? "md";
  const disabled = props.disabled ?? false;
  return (
    <button
      type={props.type ?? "button"}
      className={classNames(variant, size, disabled, props.className)}
      data-ward-btn={variant}
      data-ward-size={size}
      disabled={disabled}
      aria-describedby={props.describedBy}
      onClick={props.onClick}
      {...overflowProps(variant)}
    >
      {buttonContent(props)}
    </button>
  );
}
