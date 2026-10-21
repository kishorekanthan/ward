import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Article } from "./Article";
import { readTime, wordCount } from "./readTime";

function links(list: Element): unknown[] {
  return Array.from(list.querySelectorAll(":scope > li"), (li) => {
    const href = li.querySelector(":scope > a")?.getAttribute("href");
    const sub = li.querySelector(":scope > ol");
    return sub === null ? href : [href, links(sub)];
  });
}

describe("Article (#320)", () => {
  it("renders the TL;DR when given", () => {
    render(
      <Article title="T" date="2026-10-03" tldr="Short version.">
        <p>B</p>
      </Article>,
    );
    expect(screen.getByRole("note", { name: "TL;DR" }).textContent).toBe("TL;DRShort version.");
  });

  it("has no TL;DR and no section nav when neither is given", () => {
    render(
      <Article title="T" date="2026-10-03">
        <p>B</p>
      </Article>,
    );
    expect(screen.queryByRole("note")).toBeNull();
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("lists each heading as a link to #id, nested by level", () => {
    render(
      <Article
        title="T"
        date="2026-10-03"
        headings={[
          { id: "a", text: "A", level: 2 },
          { id: "a1", text: "A1", level: 3 },
          { id: "a1x", text: "A1x", level: 4 },
          { id: "a2", text: "A2", level: 3 },
          { id: "b", text: "B", level: 2 },
        ]}
      >
        <p>B</p>
      </Article>,
    );
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(links(nav.querySelector(":scope > ol")!)).toEqual([["#a", [["#a1", ["#a1x"]], "#a2"]], "#b"]);
  });

  it("shows the date and read time", () => {
    const { container } = render(
      <Article title="T" date="2026-10-03" minutes={6}>
        <p>B</p>
      </Article>,
    );
    expect(container.querySelector("time")?.parentElement?.textContent).toBe("3 Oct 2026 · 6 min read");
  });
});

describe("readTime (#320)", () => {
  const words = (n: number) => Array.from({ length: n }, () => "word").join(" ");

  it.each([
    ["empty text", "", 1],
    ["three words", "one two three", 1],
    ["220 words", words(220), 1],
    ["221 words", words(221), 2],
    ["660 words", words(660), 3],
    ["661 words", words(661), 4],
  ])("%s reads in %i min", (_name, text, minutes) => {
    expect(readTime(text as string)).toBe(minutes);
  });

  it("ignores markup and extra spaces", () => {
    expect(wordCount("<p>Hello</p>   <em>world</em>\n\n")).toBe(2);
    expect(wordCount("# Title\n\n- item **bold** --- 2026")).toBe(4);
    expect(readTime(`<div>${words(221).replace(/ /g, "  \n ")}</div>`)).toBe(2);
  });
});
