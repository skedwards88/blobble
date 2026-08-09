import {getColumnIndex} from "./getColumnIndex";

describe("getColumnIndex", () => {
  test("returns the column index of a given index (grid size 4)", () => {
    const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const gridSize = 4;
    const expectedColumns = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
    const result = indexes.map((index) => getColumnIndex(index, gridSize));
    expect(result).toEqual(expectedColumns);
  });

  test("returns the column index of a given index (grid size 5)", () => {
    const indexes = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24,
    ];
    const gridSize = 5;
    const expectedColumns = [
      0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4,
    ];
    const result = indexes.map((index) => getColumnIndex(index, gridSize));
    expect(result).toEqual(expectedColumns);
  });

  test("returns the column index of a given index (grid size 1)", () => {
    const index = 0;
    const gridSize = 1;
    const expectedColumn = 0;
    const result = getColumnIndex(index, gridSize);
    expect(result).toEqual(expectedColumn);
  });

  test("errors if index exceeds gridSize", () => {
    const index = 4;
    const gridSize = 2;
    expect(() => getColumnIndex(index, gridSize)).toThrow(
      "Index is not within grid size",
    );
  });

  test("errors if index is negative", () => {
    const index = -1;
    const gridSize = 2;
    expect(() => getColumnIndex(index, gridSize)).toThrow(
      "Index is not within grid size",
    );
  });

  test("errors if gridSize is 0", () => {
    const index = 0;
    const gridSize = 0;
    expect(() => getColumnIndex(index, gridSize)).toThrow(
      "Index is not within grid size",
    );
  });
});
