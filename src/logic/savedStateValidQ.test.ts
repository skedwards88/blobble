import type {GameState} from "./gameInit";
import {gameInit} from "./gameInit";
import {savedStateValidQ} from "./savedStateValidQ";

describe("savedStateValidQ", () => {
  const validGameState = gameInit({});
  test("fresh game state is valid", () => {
    expect(savedStateValidQ(validGameState)).toBe(true);
  });

  test("JSONified fresh game state is valid", () => {
    const JSONifiedSavedState: unknown = JSON.parse(
      JSON.stringify(validGameState),
    );

    expect(savedStateValidQ(JSONifiedSavedState)).toBe(true);
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  test.each([null, undefined, 1, "test", true, [], (): void => {}])(
    "non-object input is invalid: %p",
    (input) => {
      expect(savedStateValidQ(input)).toBe(false);
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  test.each(Object.keys(validGameState) as (keyof GameState)[])(
    "missing key is invalid: %s",
    (key) => {
      const clone = structuredClone(validGameState);
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete clone[key];
      expect(savedStateValidQ(clone)).toBe(false);
    },
  );

  test("extra key IS valid", () => {
    expect(savedStateValidQ({...validGameState, extra: 1})).toBe(true);
  });

  test("empty object is invalid", () => {
    expect(savedStateValidQ({})).toBe(false);
  });

  test.each<[string, unknown]>([
    ["seed", undefined],
    ["seed", null],
    ["seed", 123],
    ["isDaily", "true"],
    ["isDaily", undefined],
    ["isDaily", null],
    ["difficultyLevel", "3"],
    ["difficultyLevel", -3],
    ["difficultyLevel", 3.4],
    ["difficultyLevel", NaN],
    ["difficultyLevel", Infinity],
    ["difficultyLevel", null],
    ["difficultyLevel", undefined],
    ["hintTally", "3"],
    ["hintTally", -3],
    ["hintTally", 3.4],
    ["hintTally", NaN],
    ["hintTally", Infinity],
    ["hintTally", null],
    ["hintTally", undefined],
    ["lastInvalidWord", 5],
    ["lastInvalidWord", undefined],
    ["playedIndexes", "not an array"],
    ["playedIndexes", [1, "2", 3]],
    ["playedIndexes", [1, -2, 3]],
    ["playedIndexes", [1, 2.2, 3]],
    ["playedIndexes", [1, NaN]],
    ["letters", "ABC"],
    ["letters", ["ABC"]],
    ["letters", ["A", "1"]],
    ["letters", ["A", "a"]],
    ["letters", ["A", "Q"]],
    ["letters", ["A", 1]],
    ["letters", []],
    // string element:
    [
      "clues",
      [
        {
          shape: [1, "2", 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: ["4", 5, 6],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, null, "9"],
        },
      ],
    ],
    // Negative element:
    [
      "clues",
      [
        {
          shape: [1, -2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, -2, 6],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, -2, null],
        },
      ],
    ],
    // Decimal element:
    [
      "clues",
      [
        {
          shape: [1, 2.2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 2.2, 6],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, 2.2, null],
        },
      ],
    ],
    // NaN element:
    [
      "clues",
      [
        {
          shape: [1, NaN, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, NaN, 6],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, NaN, null],
        },
      ],
    ],
    // Infinity element
    [
      "clues",
      [
        {
          shape: [1, 2, Infinity],
          officialSolution: [4, 5, 6],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, Infinity],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, null, Infinity],
        },
      ],
    ],
    // undefined entry
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, null, undefined],
        },
      ],
    ],
    // empty array
    [
      "clues",
      [
        {
          shape: [],
          officialSolution: [],
          foundSolution: [],
        },
      ],
    ],
    // empty object
    [
      "clues",
      [
        {
          shape: {},
          officialSolution: {},
          foundSolution: {},
        },
      ],
    ],
    // not array
    [
      "clues",
      [
        {
          shape: 1,
          officialSolution: 2,
          foundSolution: 3,
        },
      ],
    ],
    // different length
    [
      "clues",
      [
        {
          shape: [1, 2, 3, 4],
          officialSolution: [4, 5, 6],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, 6, 7],
          foundSolution: [null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, null, null, null],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [8, 9, 1, 2],
        },
      ],
    ],
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [null, 1, 2, null],
        },
      ],
    ],
  ])("wrong type is invalid: %s - %j", (key, value) => {
    expect(savedStateValidQ({...validGameState, [key]: value})).toBe(false);
  });

  test.each<[string, unknown]>([
    [
      "clues",
      [
        {
          shape: [1, 2, 3],
          officialSolution: [4, 5, 6],
          foundSolution: [7, 8, 9],
        },
        {
          shape: [1, 2, 3, 4],
          officialSolution: [4, 5, 6, 8],
          foundSolution: [7, 8, null, null],
        },
      ],
    ],
    ["playedIndexes", [2, 4, 6]],
    ["lastInvalidWord", "test"],
    ["isDaily", true],
    ["hintTally", 50],
  ])("non-initial valid values are valid: %s - %j", (key, value) => {
    expect(savedStateValidQ({...validGameState, [key]: value})).toBe(true);
  });
});
