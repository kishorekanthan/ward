const SCHEME = /^([a-z][a-z0-9+.-]*):/i;
const ALLOWED_SCHEMES = new Set(["http", "https"]);

export const UNSAFE_HREF = "#";

// Read the scheme the way a browser does: tabs and newlines vanish, leading controls and spaces are skipped.
function schemeOf(href: string): string | undefined {
  const compact = href.replace(/[\t\n\r]/g, "");
  let start = 0;
  while (start < compact.length && compact.charCodeAt(start) <= 0x20) start += 1;
  return SCHEME.exec(compact.slice(start))?.[1]?.toLowerCase();
}

export function safeHref(href: string): string {
  const scheme = schemeOf(href);
  return scheme === undefined || ALLOWED_SCHEMES.has(scheme) ? href : UNSAFE_HREF;
}
