import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Figure } from "./Figure";
import { declared } from "../test-site";

describe("Figure (#308)", () => {
  it("renders the figure, the image and the caption", () => {
    const { container } = render(<Figure src="/a.png" alt="Dashboard" width={1600} height={900} caption="After the move" />);
    expect(container.firstElementChild?.tagName).toBe("FIGURE");
    expect(screen.getByRole("img", { name: "Dashboard" })).toBeTruthy();
    expect(container.querySelector("figcaption")?.textContent).toBe("After the move");
  });

  it("leaves out the caption when none is given", () => {
    const { container } = render(<Figure src="/a.png" alt="Dashboard" width={1600} height={900} />);
    expect(container.querySelector("figcaption")).toBeNull();
  });

  it("keeps the image's width and height and marks the chosen ratio", () => {
    const { container } = render(<Figure src="/a.png" alt="Dashboard" width={1600} height={900} ratio="4/3" />);
    const img = screen.getByRole("img");
    expect([img.getAttribute("width"), img.getAttribute("height")]).toEqual(["1600", "900"]);
    expect(img.parentElement?.getAttribute("data-ratio")).toBe("4/3");
    expect(container.querySelector("figure > div")).toBe(img.parentElement);
  });

  it("maps every ratio to a CSS aspect-ratio", () => {
    const expected: [string, string][] = [["16/9", "16 / 9"], ["4/3", "4 / 3"], ["3/2", "3 / 2"], ["2/1", "2 / 1"], ["1/1", "1 / 1"]];
    for (const [ratio, css] of expected) expect(declared("Figure.module.css", `.media[data-ratio="${ratio}"]`, "aspect-ratio")).toBe(css);
  });

  it("takes custom media as children", () => {
    render(
      <Figure ratio="2/1">
        <svg role="img" aria-label="Two boxes" />
      </Figure>,
    );
    expect(screen.getByRole("img", { name: "Two boxes" }).parentElement?.getAttribute("data-ratio")).toBe("2/1");
  });
});
