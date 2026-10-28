// A kind tag that only repeats the stage's own name ("Review" on a stage called Review) says nothing new.
export function repeatsName(name: string, tag: string): boolean {
  return name.trim().toLowerCase() === tag.toLowerCase();
}
