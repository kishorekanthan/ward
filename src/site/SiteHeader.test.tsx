import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { declared } from "../test-site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
];

describe("SiteHeader (#311)", () => {
  it("puts a skip link to the main content first", () => {
    const { container } = render(<SiteHeader brand="Sam" links={links} mainId="content" />);
    const first = container.querySelector("a, button, input, select, textarea, [tabindex]");
    expect(first?.textContent).toBe("Skip to content");
    expect(first?.getAttribute("href")).toBe("#content");
  });

  it("hides the skip link until it has focus", () => {
    expect(declared("SiteHeader.module.css", ".skip", "clip-path")).toBe("inset(50%)");
    expect(declared("SiteHeader.module.css", ".skip:focus", "clip-path")).toBe("none");
  });

  it("marks only the current page", () => {
    render(<SiteHeader brand="Sam" links={links} current="/writing" />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(within(nav).getByRole("link", { name: "Writing" }).getAttribute("aria-current")).toBe("page");
    expect(within(nav).getByRole("link", { name: "Work" }).hasAttribute("aria-current")).toBe(false);
    expect(screen.getByRole("link", { name: "Sam" }).hasAttribute("aria-current")).toBe(false);
  });

  it("links the site name home", () => {
    render(<SiteHeader brand="Sam" links={links} />);
    expect(screen.getByRole("link", { name: "Sam" }).getAttribute("href")).toBe("/");
  });

  it("wraps the nav list", () => {
    expect(declared("SiteHeader.module.css", ".list", "flex-wrap")).toBe("wrap");
    expect(declared("SiteHeader.module.css", ".header", "flex-wrap")).toBe("wrap");
  });
});

describe("SiteFooter (#311)", () => {
  it("renders the note and a labelled nav of links", () => {
    render(<SiteFooter note="Built with Ward." links={links} label="Elsewhere" />);
    expect(screen.getByText("Built with Ward.").tagName).toBe("P");
    const nav = screen.getByRole("navigation", { name: "Elsewhere" });
    expect(within(nav).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(["/work", "/writing"]);
  });

  it("leaves out the nav without links", () => {
    render(<SiteFooter note="Built with Ward." />);
    expect(screen.queryByRole("navigation")).toBeNull();
  });
});
