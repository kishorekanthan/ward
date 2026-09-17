// A control can be explained by several notes; aria-describedby takes a space-separated id list.
export function joinIds(...ids: Array<string | undefined>): string | undefined {
  const present = ids.filter((id): id is string => id !== undefined && id !== "");
  return present.length === 0 ? undefined : present.join(" ");
}
