import {transposeGrid} from "@skedwards88/word_logic";

export function getMaxShiftsToTopLeft(indexes, gridSize) {
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
