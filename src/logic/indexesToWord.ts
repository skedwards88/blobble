import type {LetterQu} from "@skedwards88/word_logic/dist/Types";

export function indexesToWord(
  indexes: (number | undefined)[],
  letters: LetterQu[],
): string {
  return indexes
    .map((index) => (index != undefined ? letters[index] : ""))
    .join("")
    .toUpperCase();
}
