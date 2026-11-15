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
    ["difficultyLevel", NaN],
    ["difficultyLevel", Infinity],
    ["difficultyLevel", null],
    ["difficultyLevel", undefined],
    ["hintTally", "3"],
    ["hintTally", NaN],
    ["hintTally", Infinity],
    ["hintTally", null],
    ["hintTally", undefined],
    ["lastInvalidWord", 5],
    ["lastInvalidWord", undefined],
    ["playedIndexes", "not an array"],
    ["playedIndexes", [1, "2", 3]],
    ["playedIndexes", [1, NaN]],
    ["letters", "ABC"],
    ["letters", ["ABC"]],
    ["letters", ["A", "1"]],
    ["letters", ["A", "a"]],
    ["letters", ["A", "Q"]],
    ["letters", ["A", 1]],
    ["letters", []],
    ["shapes", [1, 2, 3]],
    ["shapes", {}],
    ["shapes", [[1, 2], ["2"]]],
    ["shapes", [[1, 2], "2"]],
    [
      "shapes",
      [
        [1, 2],
        [3, NaN],
      ],
    ],
    ["shapes", [[1, Infinity]]],
    ["shapes", []],
    ["shapes", [[]]],
    ["shapes", [[], []]],
    ["shapes", [[1, 2], []]],
    ["officialSolutions", [1, 2, 3]],
    ["officialSolutions", {}],
    ["officialSolutions", [[1, 2], ["2"]]],
    ["officialSolutions", [[1, 2], "2"]],
    [
      "officialSolutions",
      [
        [1, 2],
        [3, NaN],
      ],
    ],
    ["officialSolutions", [1, 2, 3]],
    ["officialSolutions", [[1, Infinity]]],
    ["officialSolutions", []],
    ["officialSolutions", [[]]],
    ["officialSolutions", [[], []]],
    ["officialSolutions", [[1, 2], []]],
    ["foundSolutions", [[1, "2"]]],
    ["foundSolutions", [[0, undefined]]],
    ["foundSolutions", []],
    ["foundSolutions", [[]]],
    ["foundSolutions", [[], []]],
    ["foundSolutions", [[1, 2], []]],
  ])("wrong type is invalid: %s - %j", (key, value) => {
    expect(savedStateValidQ({...validGameState, [key]: value})).toBe(false);
  });

  test.each<[string, unknown]>([
    [
      "foundSolutions",
      [
        [1, 2, 3],
        [3, 4, 5, 6],
      ],
    ],
    [
      "foundSolutions",
      [
        [1, null, 3],
        [3, 4, 5, 6],
        [null, null],
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
