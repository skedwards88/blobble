import {sendAnalytics} from "@skedwards88/shared-components/src/logic/sendAnalytics";
import {getRandomSeed} from "@skedwards88/shared-components/src/logic/getRandomSeed";
import {getSeedFromDate} from "@skedwards88/shared-components/src/logic/getSeedFromDate";
import {getGame} from "./getGame";
import {getDifficultyLevelForDay} from "@skedwards88/shared-components/src/logic/getDifficultyLevelForDay";
import {getShapeSizeForDifficulty} from "./getShapeSizeForDifficulty";
import {gameIsSolvedQ} from "../logic/gameIsSolvedQ";

function validateSavedState(savedState) {
  if (typeof savedState !== "object" || savedState === null) {
    return false;
  }

  const fieldsAreExpectedTypes =
    Array.isArray(savedState.letters) &&
    savedState.letters.every((letter) => typeof letter === "string") &&
    Array.isArray(savedState.shapes) &&
    savedState.shapes.every((shape) => Array.isArray(shape)) &&
    Array.isArray(savedState.officialSolutions) &&
    savedState.officialSolutions.every((shape) => Array.isArray(shape)) &&
    Array.isArray(savedState.foundSolutions) &&
    savedState.foundSolutions.every((solution) => Array.isArray(solution)) &&
    typeof savedState.difficultyLevel === "number" &&
    typeof savedState.result === "string" &&
    Array.isArray(savedState.playedIndexes);

  if (!fieldsAreExpectedTypes) {
    return false;
  }

  return true;
}

export function gameInit({
  difficultyLevel,
  useSaved = true,
  isDaily = false,
  seed,
}) {
  const savedStateName = isDaily
    ? "blobbleDailySavedState"
    : "blobbleGameSavedState";

  if (isDaily) {
    seed = getSeedFromDate();
  }

  if (!seed) {
    seed = getRandomSeed();
  }

  const savedState = useSaved
    ? JSON.parse(localStorage.getItem(savedStateName))
    : undefined;

  if (
    savedState &&
    savedState.seed &&
    // If daily, use the saved state if the seed matches
    // otherwise, we don't care if the seed matches
    (!isDaily || savedState.seed == seed) &&
    validateSavedState(savedState) &&
    // Use the saved state if daily even if the game is solved
    // otherwise, don't use the saved state if the game is solved
    !(!isDaily && gameIsSolvedQ(savedState.foundSolutions))
  ) {
    return {...savedState, playedIndexes: [], result: ""};
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
