import {findAllWordIndexes} from "@skedwards88/word_logic";
import {getLetters} from "../logic/getLetters";
import {trie} from "./trie";
import {shuffleArray} from "@skedwards88/word_logic";
import {omitDuplicateWordsAcrossShapes} from "./omitDuplicateWordsAcrossShapes";
import {shiftIndexesToTopLeft} from "./shiftIndexesToTopLeft";

export function getLettersAndShapes({
  gridSize,
  minWordLength,
  maxWordLength,
  pseudoRandomGenerator,
}) {
  const letters = getLetters(gridSize, pseudoRandomGenerator);
  // const letters = [
  //   "W",
  //   "S",
  //   "O",
  //   "E",
  //   "Z",
  //   "A",
  //   "R",
  //   "I",
  //   "M",
  //   "E",
  //   "K",
  //   "I",
  //   "R",
  //   "Y",
  //   "A",
  //   "R",
  // ];

  const wordIndexes = findAllWordIndexes({
    grid: letters,
    minWordLength,
    maxWordLength,
    easyMode: true,
    trie: trie,
  });

  const shuffledWordIndexes = shuffleArray(wordIndexes, pseudoRandomGenerator);

  // Figure out what shape each word makes
  // by shifting the word indexes to the top left of the grid
  const normalizedWordIndexes = shuffledWordIndexes.map((indexes) =>
    shiftIndexesToTopLeft(indexes, gridSize),
  );

  // Arrange the indexes into a dict of shapeIdentifier:[wordIndexes,...]
  // where shapeIdentifier is just a stringified version of the normalized indexes
  let shapeLookup = {};
  for (let index = 0; index < shuffledWordIndexes.length; index++) {
    const shapeID = normalizedWordIndexes[index].join("-");
    shapeLookup[shapeID]
      ? shapeLookup[shapeID].push(shuffledWordIndexes[index])
      : (shapeLookup[shapeID] = [shuffledWordIndexes[index]]);
  }

  // Remove shapes so that the same word cannot be used to solve two different shapes
  const deduplicatedShapeLookup = omitDuplicateWordsAcrossShapes({
    shapeLookup,
    letters,
  });

  return [letters, deduplicatedShapeLookup];
}
