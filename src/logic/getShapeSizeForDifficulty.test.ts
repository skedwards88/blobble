import {getShapeSizeForDifficulty} from "./getShapeSizeForDifficulty";

describe("getShapeSizeForDifficulty", () => {
  test("Returns the min/max shape size for difficulty levels 1-7", () => {
    expect(getShapeSizeForDifficulty(1)).toStrictEqual([3, 3]);
    expect(getShapeSizeForDifficulty(2)).toStrictEqual([3, 4]);
    expect(getShapeSizeForDifficulty(7)).toStrictEqual([6, 6]);
  });

  test("Errors if the input is out of range", () => {
    expect(() => getShapeSizeForDifficulty(0)).toThrow(
      "difficultyLevel must be integer between 1 and 7, inclusive",
    );

    expect(() => getShapeSizeForDifficulty(8)).toThrow(
      "difficultyLevel must be integer between 1 and 7, inclusive",
    );

    expect(() => getShapeSizeForDifficulty(-1)).toThrow(
      "difficultyLevel must be integer between 1 and 7, inclusive",
    );

    expect(() => getShapeSizeForDifficulty(3.5)).toThrow(
      "difficultyLevel must be integer between 1 and 7, inclusive",
    );
  });
});
