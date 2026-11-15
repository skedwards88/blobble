import {getRandomSeed} from "@skedwards88/shared-components/src/logic/getRandomSeed";
import {getSeedFromDate} from "@skedwards88/shared-components/src/logic/getSeedFromDate";
import {getGame} from "./getGame";
import {getDifficultyLevelForDay} from "@skedwards88/shared-components/src/logic/getDifficultyLevelForDay";
import {getShapeSizeForDifficulty} from "./getShapeSizeForDifficulty";
import {gameIsSolvedQ} from "../logic/gameIsSolvedQ";
import type {LetterQu} from "@skedwards88/word_logic/dist/Types";
import {getFromStorage} from "@skedwards88/shared-components/src/logic/safeStorage";
import {savedStateValidQ} from "./savedStateValidQ";

export type GameState = {
  seed: string;
  letters: LetterQu[];
  shapes: number[][];
  officialSolutions: number[][];
  foundSolutions: (number | null)[][];
  playedIndexes: number[];
  lastInvalidWord: string | null;
  difficultyLevel: number;
  isDaily: boolean;
  hintTally: number;
};

export function gameInit({
  difficultyLevel,
  useSaved = true,
  isDaily = false,
  seed,
}: {
  difficultyLevel?: number;
  useSaved?: boolean;
  isDaily?: boolean;
  seed?: string | undefined;
}): GameState {
  const savedStateName = isDaily
    ? "blobbleDailySavedState"
    : "blobbleGameSavedState";

  let resolvedSeed = seed;

  if (isDaily) {
    resolvedSeed = getSeedFromDate();
  }

  const savedState = useSaved
    ? getFromStorage<unknown>(savedStateName)
    : undefined;

  if (
    savedState != null &&
    savedStateValidQ(savedState) &&
    // If a seed was given, it must match the saved seed in order to use saved state
    (resolvedSeed == null || savedState.seed === resolvedSeed) &&
    // Use the saved state if daily even if the game is solved
    // otherwise, don't use the saved state if the game is solved
    !(!isDaily && gameIsSolvedQ(savedState.foundSolutions))
  ) {
    return {...savedState, playedIndexes: [], lastInvalidWord: null};
  }

  // Set seed if not yet defined
  resolvedSeed ??= getRandomSeed();

  const gridSize = 4;

  const resolvedDifficultyLevel = isDaily
    ? getDifficultyLevelForDay()
    : (difficultyLevel ?? 3);

  const [minWordLength, maxWordLength] = getShapeSizeForDifficulty(
    resolvedDifficultyLevel,
  );

  const [letters, shapes, officialSolutions] = getGame({
    gridSize,
    minWordLength,
    maxWordLength,
    seed: resolvedSeed,
  });

  const foundSolutions = shapes.map((shape) => shape.map(() => null));

  return {
    seed: resolvedSeed,
    letters,
    shapes,
    // official solutions is an array of array of indexes where the index order matches the word order
    officialSolutions,
    foundSolutions,
    playedIndexes: [],
    lastInvalidWord: null,
    difficultyLevel: resolvedDifficultyLevel,
    isDaily,
    hintTally: 0,
  };
}
