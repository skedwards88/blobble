import {getConnectivity} from "./getConnectivity";

describe("getConnectivity", () => {
  test("returns the number of connections (directionally matters) between the input indexes (corner row)", () => {
    const indexes = [0, 1, 2];
    const gridSize = 4;
    expect(getConnectivity(indexes, gridSize)).toBe(4);
  });

  test("returns the number of connections (directionally matters) between the input indexes (corner column)", () => {
    const indexes = [8, 4, 0];
    const gridSize = 4;
    expect(getConnectivity(indexes, gridSize)).toBe(4);
  });

  test("returns the number of connections (directionally matters) between the input indexes (square)", () => {
    const indexes = [5, 6, 10, 9];
    const gridSize = 4;
    expect(getConnectivity(indexes, gridSize)).toBe(12);
  });

  test("duplicate indexes are counted twice", () => {
    const indexes = [5, 6, 10, 9, 5];
    const gridSize = 4;
    expect(getConnectivity(indexes, gridSize)).toBe(15);
  });

  test("works with singleton indexes input", () => {
    const indexes = [5];
    const gridSize = 4;
    expect(getConnectivity(indexes, gridSize)).toBe(0);
  });

  test("works with empty indexes input", () => {
    const indexes = [];
    const gridSize = 4;
    expect(getConnectivity(indexes, gridSize)).toBe(0);
  });

  test("throws an error when the indexes array has elements not in the grid", () => {
    const indexes = [0, 4, 16];
    const gridSize = 4;
    expect(() => getConnectivity(indexes, gridSize)).toThrow(
      "Index is not within grid size",
    );
  });

  test("throws an error when the indexes array has negative elements", () => {
    const indexes = [0, 4, -1];
    const gridSize = 4;
    expect(() => getConnectivity(indexes, gridSize)).toThrow(
      "Index is not within grid size",
    );
  });

  test("throws an error when the gridSize is 0", () => {
    const indexes = [0, 1, 2];
    const gridSize = 0;
    expect(() => getConnectivity(indexes, gridSize)).toThrow(
      "Grid size must be greater than 0",
    );
  });

  test("throws an error when the gridSize is negative", () => {
    const indexes = [0, 1, 2];
    const gridSize = -4;
    expect(() => getConnectivity(indexes, gridSize)).toThrow(
      "Grid size must be greater than 0",
    );
  });
});
