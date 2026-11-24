import type {LetterQu} from "@skedwards88/word_logic";

export function indexesToWord(
  indexes: (number | null)[],
  letters: LetterQu[],
): string {
  return indexes
    .map((index) => (index != null ? letters[index] : ""))
    .join("")
    .toUpperCase();
}
