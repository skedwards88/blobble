import {findAllWordIndexes} from "@skedwards88/word_logic";
import {getLetters} from "../logic/getLetters";
import {trie} from "./trie";
import {shuffleArray} from "@skedwards88/word_logic";
import {omitDuplicateWordsAcrossShapes} from "./omitDuplicateWordsAcrossShapes";
import {centerIndexes} from "./centerIndexes";
import {omitShapesThatExceedSize} from "./omitShapesThatExceedSize";

export function getLettersAndShapes({
  gridSize,
  minWordLength,
  maxWordLength,
  pseudoRandomGenerator,
}) {
  const letters = getLetters(gridSize, pseudoRandomGenerator);

  const wordIndexes = findAllWordIndexes({
    letters,
    numColumns: Math.sqrt(letters.length),
    numRows: Math.sqrt(letters.length),
    minWordLength,
    maxWordLength,
    easyMode: true,
    trie: trie,
  });

  // Remove wordIndexes that exceed a shape width or height of gridSize - 1
  const wordIndexesOfAppropriateSize = omitShapesThatExceedSize({
    wordIndexes,
    gridSize,
  });

  const shuffledWordIndexes = shuffleArray(
    wordIndexesOfAppropriateSize,
    pseudoRandomGenerator,
  );

  // Figure out what shape each word makes
  // by centering the word indexes in the grid
  const normalizedWordIndexes = shuffledWordIndexes.map((indexes) =>
    centerIndexes(indexes, gridSize),
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
