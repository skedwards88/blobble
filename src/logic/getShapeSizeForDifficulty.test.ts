import {getShapeSizeForDifficulty} from "./getShapeSizeForDifficulty";

test("Returns the min/max shape size for difficulty levels 1-7", () => {
  expect(getShapeSizeForDifficulty(1)).toEqual([3, 3]);
  expect(getShapeSizeForDifficulty(2)).toEqual([3, 4]);
  expect(getShapeSizeForDifficulty(7)).toEqual([6, 6]);
});

test("Errors if the input is out of range", () => {
  expect(() => getShapeSizeForDifficulty(0)).toThrow(
    "difficultyLevel must be between 1 and 7, inclusive",
  );

  expect(() => getShapeSizeForDifficulty(8)).toThrow(
    "difficultyLevel must be between 1 and 7, inclusive",
  );

  expect(() => getShapeSizeForDifficulty(-1)).toThrow(
    "difficultyLevel must be between 1 and 7, inclusive",
  );
});
