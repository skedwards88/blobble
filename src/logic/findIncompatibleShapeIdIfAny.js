function sharedWordsQ(words1, words2) {
  for (const word of words1) {
    if (words2.has(word)) {
      return true;
    }
  }
  return false;
}

export function findIncompatibleShapeIdIfAny(
  wordsForShape1,
  wordsForShape2,
  shapeId1,
  shapeId2,
) {
  // If the shapes share a word, remove the shape that has more words
  if (sharedWordsQ(wordsForShape1, wordsForShape2)) {
    if (wordsForShape1.size <= wordsForShape2.size) {
      return shapeId2;
    } else {
      return shapeId1;
    }
  }

  // If the singular and plural form of a word are both in the game,
  // remove the shape that has the plural form.
  // This isn't perfect because it doesn't account for irregular plurals
  // and because it doesn't account for words that end in "S" that aren't plural,
  // but it should catch most cases that are likely to be present in the game.
  for (const word of wordsForShape1) {
    if (wordsForShape2.has(word + "S")) {
      return shapeId2;
    }
  }
  for (const word of wordsForShape2) {
    if (wordsForShape1.has(word + "S")) {
      return shapeId1;
    }
  }

  // Otherwise, the shapes are compatible. Return undefined.
}
