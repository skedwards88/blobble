export function getShapeSizeForDifficulty(difficultyLevel) {
  // Difficulty can be 1-7
  if (difficultyLevel < 1 || difficultyLevel > 7) {
    throw new Error("difficultyLevel must be between 1 and 7, inclusive");
  }
  const difficulties = [
    [3, 3],
    [3, 4],
    [4, 4],
    [4, 5],
    [5, 5],
    [5, 6],
    [6, 6],
  ];

  return difficulties[difficultyLevel - 1];
}
