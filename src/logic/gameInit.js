import sendAnalytics from "../common/sendAnalytics";
import getRandomSeed from "../common/getRandomSeed";
import getDailySeed from "../common/getDailySeed";
import {getGame} from "./getGame";
import {getDifficultyLevelForDay} from "./getDifficultyLevelForDay";
import {getShapeSizeForDifficulty} from "./getShapeSizeForDifficulty";

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
    ? "blobbleDailySavedState"
    : "blobbleGameSavedState";

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
    // todo enter other requirements for using saved state here, including whether game is complete
  ) {
    return savedState;
  }

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

  sendAnalytics("new_game");

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
