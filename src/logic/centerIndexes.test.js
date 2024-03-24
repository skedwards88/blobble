import {centerIndexes} from "./centerIndexes";

test("Given indexes in a grid, returns the indexes of the centered input indexes", () => {
  const indexes = [11, 15, 17, 20, 21];

  const centeredIndexes = centerIndexes(indexes, 5);

  const expectedIndexes = [7, 11, 13, 16, 17];

  expect(centeredIndexes).toEqual(expectedIndexes);
});

test("If the indexes can't be perfectly centered, errs towards the top left", () => {
  const expectedIndexes = [8, 13, 14, 15, 20];

  const indexesBottomLeft = [19, 24, 25, 26, 31];

  expect(centerIndexes(indexesBottomLeft, 6)).toEqual(expectedIndexes);

  const indexesBottomRight = [22, 27, 28, 29, 34];

  expect(centerIndexes(indexesBottomRight, 6)).toEqual(expectedIndexes);

  const indexesTopLeft = [1, 6, 7, 8, 13];

  expect(centerIndexes(indexesTopLeft, 6)).toEqual(expectedIndexes);

  const indexesTopRight = [4, 9, 10, 11, 16];

  expect(centerIndexes(indexesTopRight, 6)).toEqual(expectedIndexes);
});

test("If the indexes are already centered up/down, will still center right/left", () => {
  const indexes = [6, 10, 12, 15, 16];

  const centeredIndexes = centerIndexes(indexes, 5);

  const expectedIndexes = [7, 11, 13, 16, 17];

  expect(centeredIndexes).toEqual(expectedIndexes);
});

test("If the indexes are already centered right/left, will still center up/down", () => {
  const indexes = [12, 16, 18, 21, 22];

  const centeredIndexes = centerIndexes(indexes, 5);

  const expectedIndexes = [7, 11, 13, 16, 17];

  expect(centeredIndexes).toEqual(expectedIndexes);
});

test("Works on empty indexes", () => {
  const indexes = [];

  const centeredIndexes = centerIndexes(indexes, 5);

  const expectedIndexes = [];

  expect(centeredIndexes).toEqual(expectedIndexes);
});

test("Errors if the indexes input is not a list of ints", () => {
  expect(() => centerIndexes(["A", "B", "C"], 5)).toThrow(
    "The `indexes` input must be an array of integers",
  );

  expect(() =>
    centerIndexes(
      [
        [1, 0, 1],
        [0, 1, 1],
        [0, 0, 0],
      ],
      5,
    ),
  ).toThrow("The `indexes` input must be an array of integers");
});

test("Errors if the gridSize input is not an int > 0", () => {
  expect(() => centerIndexes([12, 16, 18, 21, 22], "6")).toThrow(
    "The `gridSize` input must be an integer > 0",
  );

  expect(() => centerIndexes([12, 16, 18, 21, 22], 0)).toThrow(
    "The `gridSize` input must be an integer > 0",
  );
});

test("Errors if any of the indexes exceed the grid size", () => {
  expect(() => centerIndexes([12, 16, 18, 21, 22], 4)).toThrow(
    "One of more of the indexes exceeds the grid size",
  );

  expect(() => centerIndexes([-2, 12, 16, 18, 21, 22, 24], 6)).toThrow(
    "One of more of the indexes exceeds the grid size",
  );

  expect(() => centerIndexes([2, 16, 18, 21, 22, 36], 6)).toThrow(
    "One of more of the indexes exceeds the grid size",
  );
});
