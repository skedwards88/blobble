import {shapesMatchQ} from "./shapesMatchQ";

test("Returns true if two sets of indexes form the same shape in a grid", () => {
  expect(
    shapesMatchQ({
      indexes1: [11, 15, 17, 20, 21],
      indexes2: [17, 11, 13, 16, 7],
      gridSize: 5,
    }),
  ).toBe(true);

  expect(
    shapesMatchQ({
      indexes1: [7, 11, 13, 16, 17],
      indexes2: [6, 10, 12, 15, 16],
      gridSize: 5,
    }),
  ).toBe(true);

  expect(
    shapesMatchQ({
      indexes1: [12, 16, 18, 21, 22],
      indexes2: [6, 15, 12, 10, 16],
      gridSize: 5,
    }),
  ).toBe(true);

  expect(
    shapesMatchQ({
      indexes1: [8, 13, 14, 15, 20],
      indexes2: [19, 24, 25, 26, 31],
      gridSize: 6,
    }),
  ).toBe(true);

  expect(
    shapesMatchQ({
      indexes1: [22, 27, 28, 29, 34],
      indexes2: [19, 24, 25, 26, 31],
      gridSize: 6,
    }),
  ).toBe(true);

  expect(
    shapesMatchQ({
      indexes1: [1, 6, 7, 8, 13],
      indexes2: [19, 24, 31, 26, 25],
      gridSize: 6,
    }),
  ).toBe(true);

  expect(
    shapesMatchQ({
      indexes1: [8, 13, 14, 15, 20],
      indexes2: [4, 9, 10, 11, 16],
      gridSize: 6,
    }),
  ).toBe(true);
});

test("Returns false if two sets of indexes do not form the same shape in a grid", () => {
  expect(
    shapesMatchQ({
      indexes1: [11, 15, 17, 20, 21],
      indexes2: [7, 11, 13, 16, 18],
      gridSize: 5,
    }),
  ).toBe(false);

  expect(
    shapesMatchQ({
      indexes1: [7, 1, 13, 16, 17],
      indexes2: [6, 10, 12, 15, 16],
      gridSize: 5,
    }),
  ).toBe(false);

  expect(
    shapesMatchQ({
      indexes1: [11, 12, 16, 18, 21, 22],
      indexes2: [6, 10, 12, 15, 16],
      gridSize: 5,
    }),
  ).toBe(false);

  expect(
    shapesMatchQ({
      indexes1: [18, 13, 14, 15, 20],
      indexes2: [19, 24, 25, 26, 31],
      gridSize: 6,
    }),
  ).toBe(false);

  expect(
    shapesMatchQ({
      indexes1: [2, 27, 28, 29, 34],
      indexes2: [19, 24, 25, 26, 31],
      gridSize: 6,
    }),
  ).toBe(false);
});

test("Returns works with empty arrays", () => {
  expect(
    shapesMatchQ({
      indexes1: [],
      indexes2: [],
      gridSize: 5,
    }),
  ).toBe(true);

  expect(
    shapesMatchQ({
      indexes1: [],
      indexes2: [5, 6, 3],
      gridSize: 5,
    }),
  ).toBe(false);
});

test("Errors if the indexes input is not a list of ints", () => {
  expect(() =>
    shapesMatchQ({
      indexes1: ["7", "11", "13", 16, 17],
      indexes2: [6, 10, 12, 15, 16],
      gridSize: 5,
    }),
  ).toThrow("The `indexes` input must be an array of integers");

  expect(() =>
    shapesMatchQ({
      indexes1: [[7, 11, 13, 16, 17]],
      indexes2: [6, 10, 12, 15, 16],
      gridSize: 5,
    }),
  ).toThrow("The `indexes` input must be an array of integers");
});

test("Errors if the gridSize input is not an int > 0", () => {
  expect(() =>
    shapesMatchQ({
      indexes1: [7, 11, 13, 16, 17],
      indexes2: [6, 10, 12, 15, 16],
      gridSize: "5",
    }),
  ).toThrow("The `gridSize` input must be an integer > 0");

  expect(() =>
    shapesMatchQ({
      indexes1: [7, 11, 13, 16, 17],
      indexes2: [6, 10, 12, 15, 16],
      gridSize: 0,
    }),
  ).toThrow("The `gridSize` input must be an integer > 0");
});

test("Errors if any of the indexes exceed the grid size", () => {
  expect(() =>
    shapesMatchQ({
      indexes1: [7, 11, 13, 16, 25],
      indexes2: [6, 10, 12, 15, 16],
      gridSize: 5,
    }),
  ).toThrow("One of more of the indexes exceeds the grid size");

  expect(() =>
    shapesMatchQ({
      indexes1: [-1, 11, 13, 16, 17],
      indexes2: [6, 10, 12, 15, 16],
      gridSize: 5,
    }),
  ).toThrow("One of more of the indexes exceeds the grid size");
});
