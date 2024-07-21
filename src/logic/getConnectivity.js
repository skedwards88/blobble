import {getSurroundingIndexes} from "@skedwards88/word_logic";

// Given indexes and a grid size
// Gets the number of neighboring (diagonals included) input indexes for each index
export function getConnectivity(indexes, gridSize) {
  // error if grid size is 0 or negative
  if (gridSize <= 0) {
    throw new Error("Grid size must be greater than 0");
  }
  
  // error if index exceeds the grid size
  if (indexes.some((index) => index >= gridSize * gridSize || index < 0)) {
    throw new Error("Index is not within grid size");
  }

  let connectivity = 0;
  indexes.forEach((index) => {
    const surroundingIndexesInGrid = getSurroundingIndexes({
      index,
      numColumns: gridSize,
      numRows: gridSize,
    });
    const surroundingIndexesInInput = surroundingIndexesInGrid.filter((neighbor) => neighbor != index && indexes.includes(neighbor));
    connectivity += surroundingIndexesInInput.length;
  });

  return connectivity;
}
