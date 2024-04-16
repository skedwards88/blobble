import {indexesToWord} from "./indexesToWord";
import {findIncompatibleShapeIdIfAny} from "./findIncompatibleShapeIdIfAny";

function getWordsForShape(indexListsForShape, letters) {
  return new Set(
    indexListsForShape.map((wordIndexes) =>
      indexesToWord(wordIndexes, letters),
    ),
  );
}

export function omitDuplicateWordsAcrossShapes({shapeLookup, letters}) {
  // The same word can be present in multiple shapes,
  // but it feels weird to find the same word twice.
  // It also feels weird to have the single and plural form of a word.
  // This function eliminates those cases.

  const allShapeIDs = Object.keys(shapeLookup);
  let potentialShapeIDs = new Set(allShapeIDs);

  // Compare each shape to each other shape
  for (let index1 = 0; index1 < allShapeIDs.length - 1; index1++) {
    // Get the ID of the first shape. (The ID is just the indexes of the normalized shape, joined by a hyphen.)
    const shapeId1 = allShapeIDs[index1];

    // Skip this round if this shape has already been removed
    if (!potentialShapeIDs.has(shapeId1)) {
      continue;
    }

    // Get the words that can solve the first shape
    const wordsForShape1 = getWordsForShape(shapeLookup[shapeId1], letters);

    // Compare this shape to each later shape
    for (let index2 = index1 + 1; index2 < allShapeIDs.length; index2++) {
      const shapeId2 = allShapeIDs[index2];

      // Skip this round if this shape has already been removed
      if (!potentialShapeIDs.has(shapeId2)) {
        continue;
      }

      // Get the words that can solve the second shape
      const wordsForShape2 = getWordsForShape(shapeLookup[shapeId2], letters);

      const shapeIdToRemove = findIncompatibleShapeIdIfAny(
        wordsForShape1,
        wordsForShape2,
        shapeId1,
        shapeId2,
      );
      if (shapeIdToRemove) {
        potentialShapeIDs.delete(shapeIdToRemove);
      }
    }
  }

  let deduplicatedShapeLookup = {};
  for (const shapeID of Array.from(potentialShapeIDs)) {
    deduplicatedShapeLookup[shapeID] = shapeLookup[shapeID];
  }

  return deduplicatedShapeLookup;
}
