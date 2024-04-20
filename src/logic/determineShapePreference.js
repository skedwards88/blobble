import {indexesToWord} from "./indexesToWord";
import {getNumberOfWordsEndingInSingleS} from "./getNumberOfWordsEndingInSingleS";

export function determineShapePreference(
  shapeIndexes1,
  shapeIndexes2,
  letters,
) {
  const wordsForShape1 = shapeIndexes1.map((wordIndexes) =>
    indexesToWord(wordIndexes, letters),
  );
  const wordsForShape2 = shapeIndexes2.map((wordIndexes) =>
    indexesToWord(wordIndexes, letters),
  );

  // Prefer shapes that don't have words that end in single 'S'
  const numTerminalSInShape1 = getNumberOfWordsEndingInSingleS(wordsForShape1);
  const numTerminalSInShape2 = getNumberOfWordsEndingInSingleS(wordsForShape2);
  if (numTerminalSInShape1 < numTerminalSInShape2) {
    return -1;
  } else if (numTerminalSInShape1 > numTerminalSInShape2) {
    return 1;
  }

  // Then prefer shapes with the most words
  if (wordsForShape1.length > wordsForShape2.length) {
    return -1;
  } else if (wordsForShape1.length < wordsForShape2.length) {
    return 1;
  }

  // All other things being equal, just prefer the first shape
  return 1;
}
