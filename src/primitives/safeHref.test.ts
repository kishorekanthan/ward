import { describe, expect, it } from "vitest";
import { safeHref } from "./safeHref";

const kept = [
  "/board",
  "studio/streams/de",
  "../up",
  "?tab=runs",
  "#",
  "#/cases/DATAENG-4388",
  "",
  "/a/b:c",
  "http://example.com",
  "https://example.com/a?b=1#c",
  "HTTPS://EXAMPLE.COM",
];

const replaced = [
  "data:text/html,x",
  "blob:https://example.com/0b1c",
  "javascript:alert(1)",
  "mailto:ops@example.com",
  "JavaScript:alert(1)",
  " javascript:alert(1)",
  "\u0001data:text/html,x",
  "java\tscript:alert(1)",
  "da\nta:text/html,x",
  "jav\rascript:alert(1)",
  "ms-msdt:/id PCWDiagnostic",
  "vbscript:msgbox(1)",
  "file:///etc/passwd",
  "ftp://example.com/x",
];

describe("safeHref", () => {
  it.each(kept)("keeps %j unchanged", (href) => {
    expect(safeHref(href)).toBe(href);
  });

  it.each(replaced)("replaces %j with #", (href) => {
    expect(safeHref(href)).toBe("#");
  });
});
