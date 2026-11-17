import {findAllWordIndexes} from "@skedwards88/word_logic";
import {getLetters} from "../logic/getLetters";
import {trie} from "./trie";
import {shuffleArray} from "@skedwards88/word_logic";
import {omitDuplicateWordsAcrossShapes} from "./omitDuplicateWordsAcrossShapes";
import {centerIndexes} from "./centerIndexes";
import {omitShapesThatExceedSize} from "./omitShapesThatExceedSize";
import type seedrandom from "seedrandom";
import type {LetterQu} from "@skedwards88/word_logic/dist/Types";

export function getLettersAndShapes({
  gridSize,
  minWordLength,
  maxWordLength,
  pseudoRandomGenerator,
}: {
  gridSize: number;
  minWordLength: number;
  maxWordLength: number;
  pseudoRandomGenerator: seedrandom.PRNG;
}): [LetterQu[], Record<string, number[][]>] {
  const letters = getLetters(gridSize, pseudoRandomGenerator);

  const wordIndexes = findAllWordIndexes({
    letters,
    numColumns: Math.sqrt(letters.length),
    numRows: Math.sqrt(letters.length),
    minWordLength,
    maxWordLength,
    easyMode: true,
    trie,
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

  // Arrange the indexes into a dict of shapeIdentifier:[wordIndexes,...]
  // where shapeIdentifier is just a stringified version of the normalized indexes
  const shapeLookup: Record<string, number[][]> = {};
  for (const shuffledWordIndex of shuffledWordIndexes) {
    // Figure out what shape the word makes by centering the word indexes in the grid
    const normalizedWordIndex = centerIndexes(shuffledWordIndex, gridSize);

    const shapeID = normalizedWordIndex.join("-");

    shapeLookup[shapeID] ??= [];
    shapeLookup[shapeID].push(shuffledWordIndex);
  }

  // Remove shapes so that the same word cannot be used to solve two different shapes
  const deduplicatedShapeLookup = omitDuplicateWordsAcrossShapes({
    shapeLookup,
    letters,
  });

  return [letters, deduplicatedShapeLookup];
}
