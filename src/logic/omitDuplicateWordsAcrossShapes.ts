import {indexesToWord} from "./indexesToWord";
import {findIncompatibleShapeIdIfAny} from "./findIncompatibleShapeIdIfAny";
import type {LetterQu} from "@skedwards88/word_logic";

function getWordsForShape(
  indexListsForShape: number[][],
  letters: LetterQu[],
): Set<string> {
  return new Set(
    indexListsForShape.map((wordIndexes) =>
      indexesToWord(wordIndexes, letters),
    ),
  );
}

export function omitDuplicateWordsAcrossShapes({
  shapeLookup,
  letters,
}: {
  shapeLookup: Record<string, number[][]>;
  letters: LetterQu[];
}): Record<string, number[][]> {
  // The same word can be present in multiple shapes,
  // but it feels weird to find the same word twice.
  // It also feels weird to have the single and plural form of a word.
  // This function eliminates those cases.

  const potentialShapeIDs = new Set(Object.keys(shapeLookup));

  const allShapes = Object.entries(shapeLookup);

  for (const [index1, [shapeId1, shape1]] of allShapes.entries()) {
    // Skip this round if this shape has already been removed
    if (!potentialShapeIDs.has(shapeId1)) {
      continue;
    }

    // Get the words that can solve the first shape
    const wordsForShape1 = getWordsForShape(shape1, letters);

    // Compare this shape to each later shape
    for (const [shapeId2, shape2] of allShapes.slice(index1 + 1)) {
      // Skip this round if this shape has already been removed
      if (!potentialShapeIDs.has(shapeId2)) {
        continue;
      }

      // Get the words that can solve the second shape
      const wordsForShape2 = getWordsForShape(shape2, letters);

      const shapeIdToRemove = findIncompatibleShapeIdIfAny(
        wordsForShape1,
        wordsForShape2,
        shapeId1,
        shapeId2,
      );

      if (shapeIdToRemove != null) {
        potentialShapeIDs.delete(shapeIdToRemove);
      }
    }
  }

  const deduplicatedShapeLookup = Object.fromEntries(
    Object.entries(shapeLookup).filter(([shapeID]) =>
      potentialShapeIDs.has(shapeID),
    ),
  );

  return deduplicatedShapeLookup;
}
