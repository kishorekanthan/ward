import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectPage } from "./ProjectPage";

const source = { href: "https://example.com/loader", label: "Source code" };
const shot = (alt: string) => ({ src: `/img/${alt}.png`, alt, width: 1600, height: 900 });

function page(count: number) {
  const shots = ["a", "b", "c"].slice(0, count).map(shot);
  return render(
    <ProjectPage title="Loader" summary="S" source={source} screenshots={shots}>
      <p>Body</p>
    </ProjectPage>,
  );
}

describe("ProjectPage (#319)", () => {
  it("renders no figure with no screenshots", () => {
    const { container } = page(0);
    expect(container.querySelectorAll("figure")).toHaveLength(0);
    expect(screen.queryByRole("list", { name: "Screenshots" })).toBeNull();
  });

  it("renders one figure, not a list, with one screenshot", () => {
    const { container } = page(1);
    expect(container.querySelectorAll("figure")).toHaveLength(1);
    expect(container.querySelector("li figure")).toBeNull();
    expect(container.querySelector("figure img")?.getAttribute("alt")).toBe("a");
  });

  it("renders a list of three figures with three screenshots", () => {
    page(3);
    const list = screen.getByRole("list", { name: "Screenshots" });
    expect(Array.from(list.querySelectorAll(":scope > li > figure img"), (img) => img.getAttribute("alt"))).toEqual(["a", "b", "c"]);
  });

  it("renders the source link with its label and href", () => {
    page(0);
    const link = screen.getByRole("link", { name: "Source code" });
    expect(link.getAttribute("href")).toBe("https://example.com/loader");
  });

  it("makes source a required prop", () => {
    // @ts-expect-error source is required, so a page cannot leave out its code link.
    const missing = <ProjectPage title="T" summary="S"><p>B</p></ProjectPage>;
    expect(missing.props.source).toBeUndefined();
  });
});
