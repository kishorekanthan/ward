import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturedCard } from "./FeaturedCard";
import { ProjectCard } from "./ProjectCard";
import { declared } from "../test-site";

const props = {
  href: "/work/batch",
  eyebrow: "Case study",
  title: "Batch loads",
  summary: "Four hours down to twenty minutes.",
  tags: ["Python", "Postgres"],
};

describe("ProjectCard and FeaturedCard (#316)", () => {
  it.each([
    ["ProjectCard", <ProjectCard key="p" {...props} />],
    ["FeaturedCard", <FeaturedCard key="f" {...props} cta="Read the case study" />],
  ])("%s has one link, named by the title only", (_, card) => {
    render(card);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0].textContent).toBe("Batch loads");
    expect(links[0].getAttribute("href")).toBe("/work/batch");
  });

  it("puts the title in an h3 by default and follows headingLevel", () => {
    const { unmount } = render(<ProjectCard {...props} />);
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe("Batch loads");
    unmount();
    render(<FeaturedCard {...props} headingLevel={2} />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Batch loads");
  });

  it("gives the media box an aspect ratio, 16/9 by default", () => {
    const { container, unmount } = render(<ProjectCard {...props} media={<img alt="" src="/a.png" />} />);
    expect(container.querySelector("img")?.parentElement?.getAttribute("data-ratio")).toBe("16/9");
    unmount();
    const other = render(<ProjectCard {...props} ratio="4/3" media={<img alt="" src="/a.png" />} />);
    expect(other.container.querySelector("img")?.parentElement?.getAttribute("data-ratio")).toBe("4/3");
  });

  it("marks the card as a whole-card link and stretches the link over it", () => {
    const { container } = render(<ProjectCard {...props} />);
    expect(container.querySelector("article")?.hasAttribute("data-ward-rowlink")).toBe(true);
    expect(declared("Card.module.css", ".card", "position")).toBe("relative");
    expect(declared("Card.module.css", ".link::after", "inset")).toBe("0");
    expect(declared("Card.module.css", ".card:hover", "background")).toBe("var(--ward-color-hover)");
  });

  it("hides the call-to-action line from assistive tech, so the link name stays the title", () => {
    render(<FeaturedCard {...props} cta="Read the case study" />);
    expect(screen.getByText("Read the case study →").getAttribute("aria-hidden")).toBe("true");
  });
});
