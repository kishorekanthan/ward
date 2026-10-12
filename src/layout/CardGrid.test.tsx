import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CardGrid } from "./CardGrid";

describe("CardGrid", () => {
  it("is a named region when labelled", () => {
    render(<CardGrid label="Stream overview"><section>One</section></CardGrid>);
    expect(screen.getByRole("region", { name: "Stream overview" }).textContent).toBe("One");
  });

  it("is plain layout without a label", () => {
    const { container } = render(<CardGrid><section>One</section></CardGrid>);
    expect(screen.queryByRole("region")).toBeNull();
    expect(container.querySelector("[data-ward-card-grid]")?.getAttribute("role")).toBeNull();
  });
});
