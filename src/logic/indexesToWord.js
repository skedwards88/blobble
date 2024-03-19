export function indexesToWord(indexes, letters) {
  return indexes
    .map((index) => letters[index])
    .join("")
    .toUpperCase();
}
