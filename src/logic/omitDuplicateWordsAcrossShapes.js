export function omitDuplicateWordsAcrossShapes({shapeLookup, letters}) {
  // The same word can be present in multiple shapes,
  // but it feels weird to find the same word twice.
  // This function eliminates those cases.

  const allShapeIDs = Object.keys(shapeLookup);
  let potentialShapeIDs = new Set(allShapeIDs);

  // Compare each shape to each other shape
  for (let index1 = 0; index1 < allShapeIDs.length - 1; index1++) {
    const shapeId1 = allShapeIDs[index1];
    if (!potentialShapeIDs.has(shapeId1)) {
      continue;
    }
    const words1 = new Set(
      shapeLookup[shapeId1].map((wordIndexes) =>
        wordIndexes.map((letterIndex) => letters[letterIndex]).join(""),
      ),
    );
    for (let index2 = index1 + 1; index2 < allShapeIDs.length; index2++) {
      const shapeId2 = allShapeIDs[index2];
      if (!potentialShapeIDs.has(shapeId2)) {
        continue;
      }
      const words2 = new Set(
        shapeLookup[shapeId2].map((wordIndexes) =>
          wordIndexes.map((letterIndex) => letters[letterIndex]).join(""),
        ),
      );
      // If the shapes share a word, remove the shape that has more words
      const uniqueValues = new Set([...words1, ...words2]);
      if (uniqueValues.size < words1.size + words2.size) {
        words1.size < words2.size
          ? potentialShapeIDs.delete(shapeId2)
          : potentialShapeIDs.delete(shapeId1);
      }
    }
  }

  let deduplicatedShapeLookup = {};
  for (const shapeID of Array.from(potentialShapeIDs)) {
    deduplicatedShapeLookup[shapeID] = shapeLookup[shapeID];
  }

  return deduplicatedShapeLookup;
}
