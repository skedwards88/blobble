import {omitShapesThatExceedSize} from "./omitShapesThatExceedSize";

describe("omitShapesThatExceedSize", () => {
  test("removes wordIndexes that exceed a shape width or height of gridSize - 1 (grid size 5)", () => {
    const wordIndexes = [
      [0, 1, 2, 3], // width 4, height 1
      [2, 3, 4, 0, 1], // width 5, height 1
      [15, 18, 19, 20, 16, 17], // width 5, height 2
      [10, 11, 12, 13, 14, 15, 16], // width 5, height 2
      [0, 1, 2, 3, 5, 6, 7, 8], // width 4, height 2
      [15, 10, 5, 0], // width 1, height 4
      [2, 7, 12, 17, 22], // width 1, height 5
      [0, 5, 10, 15, 20, 2], // width 2, height 5
      [3, 7, 11, 15], // width 4, height 4
      [0, 6, 12, 18, 24], // width 5, height 5
    ];
    const gridSize = 5;
    const expectedWordIndexes = [
      [0, 1, 2, 3], // width 4, height 1
      [0, 1, 2, 3, 5, 6, 7, 8], // width 4, height 2
      [15, 10, 5, 0], // width 1, height 4
      [3, 7, 11, 15], // width 4, height 4
    ];
    const result = omitShapesThatExceedSize({wordIndexes, gridSize});
    expect(result).toEqual(expectedWordIndexes);
  });

  test("removes wordIndexes that exceed a shape width or height of gridSize - 1 (grid size 4)", () => {
    const wordIndexes = [
      [1, 2, 3], // width 3, height 1
      [0, 1, 2, 3], // width 4, height 1
      [2, 3, 7, 1], // width 3, height 2
      [2, 3, 4, 0, 1], // width 4, height 2
      [7, 8, 9, 10, 11, 12], // width 4, height 3
      [8, 4, 9, 10, 12], // width 3, height 3
      [12, 8, 4, 0], // width 1, height 4
      [12, 8, 4], // width 1, height 3
      [0, 4, 8, 12, 5], // width 2, height 4
      [0, 4, 8, 5], // width 2, height 3
      [3, 6, 9, 12], // width 4, height 4
    ];
    const gridSize = 4;
    const expectedWordIndexes = [
      [1, 2, 3], // width 3, height 1
      [2, 3, 7, 1], // width 3, height 2
      [8, 4, 9, 10, 12], // width 3, height 3
      [12, 8, 4], // width 1, height 3
      [0, 4, 8, 5], // width 2, height 3
    ];
    const result = omitShapesThatExceedSize({wordIndexes, gridSize});
    expect(result).toEqual(expectedWordIndexes);
  });

  test("works with empty wordIndexes input", () => {
    const wordIndexes = [];
    const gridSize = 4;
    const expectedWordIndexes = [];
    const result = omitShapesThatExceedSize({wordIndexes, gridSize});
    expect(result).toEqual(expectedWordIndexes);
  });

  test("works with singleton wordIndexes input", () => {
    const wordIndexes = [[0, 1, 2, 3]];
    const gridSize = 4;
    const expectedWordIndexes = [];
    const result = omitShapesThatExceedSize({wordIndexes, gridSize});
    expect(result).toEqual(expectedWordIndexes);
  });

  test("does not remove any indexes if all are within size", () => {
    const wordIndexes = [
      [1, 2, 3], // width 3, height 1
      [2, 3, 7, 1], // width 3, height 2
      [8, 4, 9, 10, 12], // width 3, height 3
      [12, 8, 4], // width 1, height 3
      [0, 4, 8, 5], // width 2, height 3
    ];
    const gridSize = 4;
    const expectedWordIndexes = [
      [1, 2, 3], // width 3, height 1
      [2, 3, 7, 1], // width 3, height 2
      [8, 4, 9, 10, 12], // width 3, height 3
      [12, 8, 4], // width 1, height 3
      [0, 4, 8, 5], // width 2, height 3
    ];
    const result = omitShapesThatExceedSize({wordIndexes, gridSize});
    expect(result).toEqual(expectedWordIndexes);
  });

  test("removes all input if all exceed size", () => {
    const wordIndexes = [
      [0, 1, 2, 3], // width 4, height 1
      [2, 3, 4, 0, 1], // width 4, height 2
      [7, 8, 9, 10, 11, 12], // width 4, height 3
      [12, 8, 4, 0], // width 1, height 4
      [3, 6, 9, 12], // width 4, height 4
    ];
    const gridSize = 4;
    const expectedWordIndexes = [];
    const result = omitShapesThatExceedSize({wordIndexes, gridSize});
    expect(result).toEqual(expectedWordIndexes);
  });
});
