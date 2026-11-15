import type {LetterQu} from "@skedwards88/word_logic/dist/Types";
import type {GameState} from "./gameInit";

type Validators<T> = {[K in keyof T]-?: (input: unknown) => input is T[K]};

// This should give a type error if I add/remove an entry in the LetterQu type and don't update it here
const letterValid: Record<LetterQu, true> = {
  A: true,
  B: true,
  C: true,
  D: true,
  E: true,
  F: true,
  G: true,
  H: true,
  I: true,
  J: true,
  K: true,
  L: true,
  M: true,
  N: true,
  O: true,
  P: true,
  Qu: true,
  QU: true,
  R: true,
  S: true,
  T: true,
  U: true,
  V: true,
  W: true,
  X: true,
  Y: true,
  Z: true,
};

function isFiniteNumber(input: unknown): input is number {
  return typeof input === "number" && Number.isFinite(input);
}

function isNumberOrNull(input: unknown): input is number | null {
  return input === null || isFiniteNumber(input);
}

function isLetterQu(input: unknown): input is LetterQu {
  return typeof input === "string" && Object.hasOwn(letterValid, input);
}

function isArrayOf<T>(
  input: unknown,
  guard: (input: unknown) => input is T,
  allowEmpty: boolean,
): input is T[] {
  return (
    Array.isArray(input) &&
    input.every(guard) &&
    (allowEmpty || input.length > 0)
  );
}

// This should give a type error if I add/remove a key in the GameState type and don't update it here
const gameStateValidators: Validators<GameState> = {
  seed: (input): input is string => typeof input === "string",
  isDaily: (input): input is boolean => typeof input === "boolean",
  difficultyLevel: isFiniteNumber,
  hintTally: isFiniteNumber,
  lastInvalidWord: (input): input is string | null =>
    input === null || typeof input === "string",
  playedIndexes: (input) => isArrayOf(input, isFiniteNumber, true),
  letters: (input) => isArrayOf(input, isLetterQu, false),
  shapes: (input) =>
    isArrayOf(input, (input) => isArrayOf(input, isFiniteNumber, false), false),
  officialSolutions: (input) =>
    isArrayOf(input, (input) => isArrayOf(input, isFiniteNumber, false), false),
  foundSolutions: (input) =>
    isArrayOf(input, (input) => isArrayOf(input, isNumberOrNull, false), false),
};

export function savedStateValidQ(input: unknown): input is GameState {
  if (typeof input !== "object" || input === null) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- object narrowed above; reading keys as unknown
  const record = input as Record<string, unknown>;

  // False if any of the validators are false
  return Object.entries(gameStateValidators).every(([key, validate]) =>
    validate(record[key]),
  );
}
