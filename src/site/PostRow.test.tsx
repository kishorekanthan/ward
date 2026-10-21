import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate";
import { PostRow } from "./PostRow";
import { TextList } from "./TextList";

describe("PostRow (#317)", () => {
  it("renders a time element with the ISO date and its label", () => {
    const { container } = render(<PostRow href="/w/a" title="Batch loads" date="2026-10-03" meta="6 min read" />);
    const time = container.querySelector("time");
    expect(time?.getAttribute("datetime")).toBe("2026-10-03");
    expect(time?.textContent).toBe("3 Oct 2026");
    expect(time?.parentElement?.textContent).toBe("3 Oct 2026 · 6 min read");
  });

  it("has one link named by the title, in an h3 by default", () => {
    render(<PostRow href="/w/a" title="Batch loads" date="2026-10-03" summary="Short." />);
    expect(screen.getAllByRole("link").map((a) => a.textContent)).toEqual(["Batch loads"]);
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe("Batch loads");
  });
});

describe("formatDate (#317)", () => {
  it.each([
    ["2026-10-03", "3 Oct 2026"],
    ["2026-01-30", "30 Jan 2026"],
    ["2025-09-01", "1 Sep 2025"],
    ["2026-12-31T23:30:00Z", "31 Dec 2026"],
    ["2026-03-01T00:30:00+01:00", "28 Feb 2026"],
    ["not a date", "not a date"],
  ])("%j reads %j", (iso, label) => {
    expect(formatDate(iso)).toBe(label);
  });
});

describe("TextList (#317)", () => {
  it("renders a ul with one li per child", () => {
    const { container } = render(
      <TextList label="Strengths">
        <>One</>
        <>Two</>
        {"Three"}
      </TextList>,
    );
    const list = screen.getByRole("list", { name: "Strengths" });
    expect(list.tagName).toBe("UL");
    expect(Array.from(container.querySelectorAll("ul > li"), (li) => li.textContent)).toEqual(["One", "Two", "Three"]);
  });

  it("marks a ruled list", () => {
    render(
      <TextList rules>
        <>One</>
      </TextList>,
    );
    expect(screen.getByRole("list").getAttribute("data-rules")).toBe("true");
  });
});
