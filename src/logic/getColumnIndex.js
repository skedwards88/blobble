// Gets the column index of a given index in a grid, assuming a square grid
export function getColumnIndex(index, gridSize) {
  // error if index exceeds the grid size
  if (index >= gridSize * gridSize || index < 0) {
    throw new Error("Index is not within grid size");
  }

  return index % gridSize;
}
