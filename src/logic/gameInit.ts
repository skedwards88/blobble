import {getRandomSeed} from "@skedwards88/shared-components/src/logic/getRandomSeed";
import {getSeedFromDate} from "@skedwards88/shared-components/src/logic/getSeedFromDate";
import {getGame} from "./getGame";
import {getDifficultyLevelForDay} from "@skedwards88/shared-components/src/logic/getDifficultyLevelForDay";
import {getShapeSizeForDifficulty} from "./getShapeSizeForDifficulty";
import {gameIsSolvedQ} from "../logic/gameIsSolvedQ";
import type {LetterQu} from "@skedwards88/word_logic/dist/Types";
import {getFromStorage} from "@skedwards88/shared-components/src/logic/safeStorage";
import {savedStateValidQ} from "./savedStateValidQ";

export type Clue = {
  shape: number[];
  // official solution is an array of indexes where the index order matches the word order
  officialSolution: number[];
  foundSolution: (number | null)[];
};

export type GameState = {
  seed: string;
  letters: LetterQu[];
  clues: Clue[];
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
    ? getFromStorage(savedStateName, savedStateValidQ)
    : undefined;

  if (
    savedState != null &&
    // If a seed was given, it must match the saved seed in order to use saved state
    (resolvedSeed == null || savedState.seed === resolvedSeed) &&
    // Use the saved state if daily even if the game is solved
    // otherwise, don't use the saved state if the game is solved
    !(
      isDaily ||
      !gameIsSolvedQ(savedState.clues.map((clue) => clue.foundSolution))
    )
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

  const [letters, clues] = getGame({
    gridSize,
    minWordLength,
    maxWordLength,
    seed: resolvedSeed,
  });

  return {
    seed: resolvedSeed,
    letters,
    clues,
    playedIndexes: [],
    lastInvalidWord: null,
    difficultyLevel: resolvedDifficultyLevel,
    isDaily,
    hintTally: 0,
  };
}
