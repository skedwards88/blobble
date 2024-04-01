import sendAnalytics from "../common/sendAnalytics";
import getRandomSeed from "../common/getRandomSeed";
import getDailySeed from "../common/getDailySeed";
import {getGame} from "./getGame";

function getShapeSizeForDifficulty(difficultyLevel) {
  // Difficulty can be 1-7
  const difficulties = [
    [3, 3],
    [3, 4],
    [4, 4],
    [4, 5],
    [5, 5],
    [5, 6],
    [6, 6],
  ];

  return difficulties[difficultyLevel];
}

function getDifficultyLevelForDay() {
  // todo
  return 3;
}

export function gameInit({
  difficultyLevel,
  useSaved = true,
  isDaily = false,
  seed,
}) {
  if (isDaily) {
    // todo remove
    return {};
  }
  const savedStateName = isDaily
    ? "blobbleDailySavedStateName"
    : "blobbleGameSavedStateName";

  if (isDaily) {
    seed = getDailySeed();
  }

  if (!seed) {
    seed = getRandomSeed();
  }

  const savedState = useSaved
    ? JSON.parse(localStorage.getItem(savedStateName))
    : undefined;

  if (
    savedState
    // todo enter other requirements for using saved state here
  ) {
    // todo uncomment return
    // return savedState;
  }

  sendAnalytics("new_game");

  const gridSize = 4;

  difficultyLevel = isDaily ? getDifficultyLevelForDay() : difficultyLevel || 3;

  const [minWordLength, maxWordLength] =
    getShapeSizeForDifficulty(difficultyLevel);

  const [letters, shapes, officialSolutions] = getGame({
    gridSize,
    minWordLength,
    maxWordLength,
    seed,
  });

  console.log(
    officialSolutions.map((solution) =>
      solution.map((index) => letters[index]).join(""),
    ),
  );

  const foundSolutions = shapes.map((shape) => shape.map(() => undefined));

  return {
    seed,
    letters,
    shapes,
    // official solutions is an array of array of indexes where the index order matches the word order
    officialSolutions,
    foundSolutions,
    playedIndexes: [],
    result: "",
    difficultyLevel,
  };
}
