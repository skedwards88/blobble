import {findAllWordIndexes} from "@skedwards88/word_logic";
import {getLetters} from "../logic/getLetters";
import {trie} from "./trie";
import {transposeGrid} from "@skedwards88/word_logic";

export function getGame({gridSize}) {
  const letters = getLetters(gridSize);
  // const letters = ["B","E","P","U","H","J","Z","Z","Z","Z","Z","Z","Z","Z","Z","Z"]

  const wordIndexes = findAllWordIndexes({
    grid: letters,
    minWordLength: 4,
    maxWordLength: 6,
    easyMode: true,
    trie: trie,
  });

  // todo shuffle words?

  // Figure out what shape each word makes
  const normalizedWordIndexes = wordIndexes.map((indexes) =>
    shiftIndexes(indexes, gridSize),
  );

  // Arrange the indexes into a dict of shapeIdentifier:[wordIndexes,...]
  let shapeLookup = {};
  for (let index = 0; index < wordIndexes.length; index++) {
    const shapeID = normalizedWordIndexes[index].join("-");
    shapeLookup[shapeID]
      ? shapeLookup[shapeID].push(wordIndexes[index])
      : (shapeLookup[shapeID] = [wordIndexes[index]]);
  }
  console.log("rw");
  console.log(JSON.stringify(shapeLookup));

  // Pick 4 unique shapes // todo handle case if < 4 // todo prefer shapes with more or fewer solutions? prefer shapes with most difference in morphology?
  const deduplicatedShapeLookup = omitDuplicateWords({shapeLookup, letters});

  const shapeIDs = Object.keys(deduplicatedShapeLookup).slice(0, 4);
  const shapes = shapeIDs.map((id) => id.split("-").map((i) => parseInt(i))); // todo make more elegant
  return [letters, shapes];
}

function omitDuplicateWords({shapeLookup, letters}) {
  // The same word can be present in multiple shapes,
  // but it feels weird to find the same word twice.

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

function shiftIndexes(indexes, gridSize) {
  const sortedIndexes = [...indexes].sort((a, b) => a - b);
  const [maxShiftUp, maxShiftLeft] = getMaxShifts(sortedIndexes, gridSize);

  const shiftedLeft = sortedIndexes.map((index) => index - maxShiftLeft);
  const shiftedUpAndLeft = shiftedLeft.map(
    (index) => index - maxShiftUp * gridSize,
  );

  return shiftedUpAndLeft;
}

function getMaxShifts(indexes, gridSize) {
  // Arrange the flat indexes into a 2D grid
  let grid = Array.from({length: gridSize}, () => Array(gridSize).fill(0));
  for (const index of indexes) {
    const rowIndex = Math.floor(index / gridSize);
    const columnIndex = index % gridSize;
    grid[rowIndex][columnIndex] = 1;
  }

  // Figure out the number of empty rows at the top
  let maxShiftUp = 0;
  for (const row of grid) {
    if (row.includes(1)) {
      break;
    }
    maxShiftUp++;
  }

  // Transpose the grid
  const transposedGrid = transposeGrid(grid);

  // Figure out the number of empty rows on the left
  let maxShiftLeft = 0;
  for (const row of transposedGrid) {
    if (row.includes(1)) {
      break;
    }
    maxShiftLeft++;
  }
  return [maxShiftUp, maxShiftLeft];
}
