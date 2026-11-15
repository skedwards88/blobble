export function getNumberOfWordsEndingInSingleS(words: string[]): number {
  return words.filter(
    (word) => word.endsWith("S") && word[word.length - 2] !== "S",
  ).length;
}
