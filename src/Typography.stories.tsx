import { bothThemes } from "../.storybook/bothThemes";
import tokens from "../tokens.json";
import { v } from "./tokens";

const typeVar = v.type as Record<string, string>;
const typeTokens = Object.entries(tokens.type as Record<string, { size: number }>);

// One row per scale step: a specimen at that size, then every type token set on it.
function Scale() {
  return (
    <div style={{ display: "grid", gap: v.space.s5 }}>
      {tokens.typeScale.map((step) => (
        <section key={step} data-scale-step={step} style={{ display: "grid", gap: v.space.s2 }}>
          <p data-specimen style={{ font: `400 ${step}px/1.2 ${tokens.font.prose}` }}>
            {step}px specimen, shown even when no token sits on this step
          </p>
          {typeTokens
            .filter(([, t]) => t.size === step)
            .map(([name]) => (
              <p key={name} data-type-token={name} style={{ font: typeVar[name] }}>
                {name}: stage counts, card meta and page titles
              </p>
            ))}
        </section>
      ))}
    </div>
  );
}

export default {
  title: "Tokens/Typography",
  component: Scale,
  decorators: [bothThemes],
};

export const TypeScale = {};
