export function getNumberOfWordsEndingInSingleS(words) {
  return words.filter(
    (word) => word[word.length - 1] === "S" && word[word.length - 2] !== "S",
  ).length;
}
