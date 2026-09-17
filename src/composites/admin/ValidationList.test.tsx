import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ValidationList, type ValidationCheck } from "./ValidationList";

const checks: ValidationCheck[] = [
  { passed: true, text: "Contrast against the light ground", measured: "5.42:1" },
  { passed: false, text: "Contrast against the dark ground", measured: "3.10:1" },
  { passed: null, text: "Distinct from every live stream mark", runsWhen: "the stream is published" },
];

describe("ValidationList", () => {
  it("renders a pending check as a box and says when it runs", () => {
    render(<ValidationList checks={checks} />);
    expect(screen.getByText("runs when the stream is published")).not.toBeNull();
    /* An empty outlined box, which is the comp's `.no`. The point of the
       assertion is that it is not filled: a pending check must not be able to
       read as a result. */
    const pending = screen.getByRole("img", { name: "pending" });
    expect(pending.getAttribute("data-state")).toBe("unmet");
    expect(pending.textContent).toBe("");
  });

  it("never reads a pending check as a failure", () => {
    render(<ValidationList checks={[checks[2]]} />);
    expect(screen.queryByRole("img", { name: "failed" })).toBeNull();
    expect(screen.queryByRole("img", { name: "passed" })).toBeNull();
  });

  /* Asserted by state rather than by colour value. The fill now comes from the
     chip role pair so that it is right in both themes, which means there is no
     single colour to assert — and the distinction that matters to a reader is
     met / failed / not-yet-run, plus a glyph so it does not rest on colour
     alone. */
  it("keeps a passed check and a failed one visibly different, and not only by colour", () => {
    render(<ValidationList checks={checks} />);
    const passed = screen.getByRole("img", { name: "passed" });
    const failed = screen.getByRole("img", { name: "failed" });
    expect(passed.getAttribute("data-state")).toBe("met");
    expect(failed.getAttribute("data-state")).toBe("failed");
    expect(passed.textContent).toBe("✓");
    expect(failed.textContent).toBe("✕");
  });

  it("shows what was measured beside the check", () => {
    render(<ValidationList checks={checks} />);
    expect(screen.getByText("5.42:1")).not.toBeNull();
  });

  it("is a list", () => {
    const { container } = render(<ValidationList checks={checks} />);
    expect(container.querySelector("ul")?.querySelectorAll("li").length).toBe(3);
  });
});
