// Labels read in sentence case (#199): a lowercase word from data gains only a capital first letter.
export function sentence(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
