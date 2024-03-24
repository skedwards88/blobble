import {centerGrid} from "@skedwards88/word_logic";

export function centerIndexes(indexes, gridSize) {
  if (!Array.isArray(indexes) || !indexes.every(Number.isInteger)) {
    throw new TypeError("The `indexes` input must be an array of integers");
  }

  if (!Number.isInteger(gridSize) || gridSize <= 0) {
    throw new TypeError("The `gridSize` input must be an integer > 0");
  }

  if (indexes.some((index) => index > gridSize * gridSize - 1 || index < 0)) {
    throw new Error("One of more of the indexes exceeds the grid size");
  }

  // return early if the index list is empty
  if (indexes.length === 0) {
    return indexes;
  }

  // Arrange the flat indexes into a 2D grid of 0 and 1 where 1 represents an input index
  let grid = Array.from({length: gridSize}, () => Array(gridSize).fill(0));
  for (const index of indexes) {
    const rowIndex = Math.floor(index / gridSize);
    const columnIndex = index % gridSize;
    grid[rowIndex][columnIndex] = 1;
  }

  // Center the grid
  const centeredGrid = centerGrid(grid, 0);

  // Flatten the grid, and get the indexes that are occupied
  const filledIndexes = centeredGrid
    .flatMap((i) => i)
    .reduce((filledIndexes, currentValue, currentIndex) => {
      if (currentValue !== 0) {
        filledIndexes.push(currentIndex);
      }
      return filledIndexes;
    }, []);

  return filledIndexes;
}
