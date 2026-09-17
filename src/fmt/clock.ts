const clockFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function clock(iso: string): string {
  return clockFormat.format(new Date(iso));
}
