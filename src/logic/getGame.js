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
    maxWordLength: 4,
    easyMode: true,
    trie: trie,
  });

  // todo shuffle words?

  // Figure out what shape each word makes
  const normalizedWordIndexes = wordIndexes.map((indexes) =>
    shiftIndexes(indexes, gridSize),
  );

  console.log(JSON.stringify(normalizedWordIndexes));

  // Arrange the indexes into a dict of shapeIdentifier:[wordIndexes,...]
  let shapeLookup = {};
  for (let index = 0; index < wordIndexes.length; index++) {
    const shapeID = normalizedWordIndexes[index].join("-");
    shapeLookup[shapeID]
      ? shapeLookup[shapeID].push(wordIndexes[index])
      : (shapeLookup[shapeID] = [wordIndexes[index]]);
  }
  console.log(JSON.stringify(shapeLookup));

  // Pick 4 unique shapes // todo handle case if < 4 // todo prefer shapes with mroe of fewer solutions? prefer shapes with most difference in morphology?

  const shapeIDs = Object.keys(shapeLookup).slice(0, 4);
  const shapes = shapeIDs.map((id) => id.split("-").map((i) => parseInt(i))); // todo make more elegant
  return [letters, shapes];
}

function shiftIndexes(indexes, gridSize) {
  const sortedIndexes = [...indexes].sort();
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
