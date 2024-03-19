import {getMaxShiftsToTopLeft} from "./getMaxShiftsToTopLeft";

export function shiftIndexesToTopLeft(indexes, gridSize) {
  const sortedIndexes = [...indexes].sort((a, b) => a - b);
  const [maxShiftUp, maxShiftLeft] = getMaxShiftsToTopLeft(sortedIndexes, gridSize);

  const shiftedLeft = sortedIndexes.map((index) => index - maxShiftLeft);
  const shiftedUpAndLeft = shiftedLeft.map(
    (index) => index - maxShiftUp * gridSize,
  );

  return shiftedUpAndLeft;
}
