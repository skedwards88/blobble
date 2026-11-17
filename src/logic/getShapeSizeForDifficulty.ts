const difficulties: Record<number, [number, number]> = {
  1: [3, 3],
  2: [3, 4],
  3: [4, 4],
  4: [4, 5],
  5: [5, 5],
  6: [5, 6],
  7: [6, 6],
};

export function getShapeSizeForDifficulty(
  difficultyLevel: number,
): [number, number] {
  const size = difficulties[difficultyLevel];

  if (size === undefined) {
    throw new Error(
      "difficultyLevel must be integer between 1 and 7, inclusive",
    );
  }

  return size;
}
