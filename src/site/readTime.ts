const WORDS_PER_MINUTE = 220;

// Counts words in text that may hold HTML or Markdown: tags go, and a token counts only if it holds a letter or digit.
export function wordCount(text: string): number {
  const plain = text.replace(/<[^>]*>/g, " ");
  return plain.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

// Whole minutes to read the text at 220 words a minute, rounded up, never less than 1.
export function readTime(text: string): number {
  return Math.max(1, Math.ceil(wordCount(text) / WORDS_PER_MINUTE));
}
