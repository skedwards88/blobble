import {getColumnIndex} from "./getColumnIndex";
import {getRowIndex} from "./getRowIndex";

// Remove wordIndexes that exceed a shape width or height of gridSize - 1
export function omitShapesThatExceedSize({wordIndexes, gridSize}) {
  const filteredWordIndexes = wordIndexes.filter((indexes) => {
    const rowIndexes = indexes.map((index) => getRowIndex(index, gridSize));
    const columnIndexes = indexes.map((index) =>
      getColumnIndex(index, gridSize),
    );
    const maxRow = Math.max(...rowIndexes);
    const minRow = Math.min(...rowIndexes);
    const maxColumn = Math.max(...columnIndexes);
    const minColumn = Math.min(...columnIndexes);

    return (
      maxRow - minRow < gridSize - 1 && maxColumn - minColumn < gridSize - 1
    );
  });

  return filteredWordIndexes;
}
