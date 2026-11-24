import type {Clue, GameState} from "./gameInit";
import type {Validators} from "@skedwards88/shared-components/src/logic/validators";
import {
  isArrayOf,
  isNonNegativeInteger,
  isNonNegativeIntegerOrNull,
  validateObject,
} from "@skedwards88/shared-components/src/logic/validators";
import {isLetterQu} from "@skedwards88/word_logic";

// This should give a type error if I add/remove a key in the GameState type and don't update it here
const gameStateValidators: Validators<GameState> = {
  seed: (input): input is string => typeof input === "string",
  isDaily: (input): input is boolean => typeof input === "boolean",
  difficultyLevel: isNonNegativeInteger,
  hintTally: isNonNegativeInteger,
  lastInvalidWord: (input): input is string | null =>
    input === null || typeof input === "string",
  playedIndexes: (input) => isArrayOf(input, isNonNegativeInteger, true),
  letters: (input) => isArrayOf(input, isLetterQu, false),
  clues: (input) => isArrayOf(input, clueValidQ, false),
};

const clueValidators: Validators<Clue> = {
  shape: (input) => isArrayOf(input, isNonNegativeInteger, false),
  officialSolution: (input) => isArrayOf(input, isNonNegativeInteger, false),
  foundSolution: (input) => isArrayOf(input, isNonNegativeIntegerOrNull, false),
};

function clueValidQ(input: unknown): input is Clue {
  return (
    validateObject(input, clueValidators) &&
    input.foundSolution.length === input.officialSolution.length &&
    input.foundSolution.length === input.shape.length
  );
}

export function savedStateValidQ(input: unknown): input is GameState {
  return validateObject(input, gameStateValidators);
}
