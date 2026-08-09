import {getRandomSeed} from "@skedwards88/shared-components/src/logic/getRandomSeed";
import {getSeedFromDate} from "@skedwards88/shared-components/src/logic/getSeedFromDate";
import {getGame} from "./getGame";
import {getDifficultyLevelForDay} from "@skedwards88/shared-components/src/logic/getDifficultyLevelForDay";
import {getShapeSizeForDifficulty} from "./getShapeSizeForDifficulty";
import {gameIsSolvedQ} from "../logic/gameIsSolvedQ";
import type {LetterQu} from "@skedwards88/word_logic/dist/Types";
import {getFromStorage} from "@skedwards88/shared-components/src/logic/safeStorage";

export type GameState = {
  seed: string;
  letters: LetterQu[];
  shapes: number[][];
  officialSolutions: number[][];
  foundSolutions: (number | undefined)[][];
  playedIndexes: number[];
  lastInvalidWord: string | null;
  difficultyLevel: number;
  isDaily: boolean;
  hintTally: number;
};

function validateSavedState(savedState: GameState): boolean {
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
}: {
  difficultyLevel?: number | undefined;
  useSaved?: boolean | undefined;
  isDaily?: boolean | undefined;
  seed?: string | undefined;
}): GameState {
  const savedStateName = isDaily
    ? "blobbleDailySavedState"
    : "blobbleGameSavedState";

  if (isDaily) {
    seed = getSeedFromDate();
  }

  const savedState = useSaved
    ? getFromStorage<GameState>(savedStateName)
    : undefined;

  if (
    savedState &&
    // If a seed was given, it must match the saved seed in order to use saved state
    (!seed || savedState.seed === seed) &&
    validateSavedState(savedState) &&
    // Use the saved state if daily even if the game is solved
    // otherwise, don't use the saved state if the game is solved
    !(!isDaily && gameIsSolvedQ(savedState.foundSolutions))
  ) {
    return {...savedState, playedIndexes: [], lastInvalidWord: null};
  }

  if (!seed) {
    seed = getRandomSeed();
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

  return {
    seed,
    letters,
    shapes,
    // official solutions is an array of array of indexes where the index order matches the word order
    officialSolutions,
    foundSolutions,
    playedIndexes: [],
    lastInvalidWord: null,
    difficultyLevel,
    isDaily,
    hintTally: 0,
  };
}
