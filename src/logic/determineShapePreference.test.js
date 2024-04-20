import {determineShapePreference} from "./determineShapePreference";

test("Prefers the shape that ends in fewer single 'S's", () => {
  const shapeWith1S = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
  ];
  const shapeWith2S = [
    [0, 5, 4],
    [1, 6, 7],
    [9, 8, 7],
  ];

  const letters = [
    "C",
    "A",
    "R",
    "T",
    "D",
    "O",
    "G",
    "S",
    "E",
    "R",
    "G",
    "H",
    "E",
    "N",
    "G",
    "H",
  ];

  expect(determineShapePreference(shapeWith1S, shapeWith2S, letters)).toBe(-1);

  expect(determineShapePreference(shapeWith2S, shapeWith1S, letters)).toBe(1);
});

test("Prefers the shape that ends in fewer single 'S's (non-single terminal 'S's don't count)", () => {
  const shapeWith1S = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
  ];
  const shapeWith2S = [
    [0, 5, 4],
    [1, 6, 7],
    [9, 8, 7],
  ];

  const letters = [
    "C",
    "A",
    "S",
    "S",
    "D",
    "O",
    "G",
    "S",
    "E",
    "R",
    "G",
    "H",
    "E",
    "N",
    "G",
    "H",
  ];

  expect(determineShapePreference(shapeWith1S, shapeWith2S, letters)).toBe(-1);

  expect(determineShapePreference(shapeWith2S, shapeWith1S, letters)).toBe(1);
});

test("If the number of terminal 'S's are equal, prefer the shape with the most words", () => {
  const shape1 = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
  ];
  const shape2 = [
    [0, 5, 4],
    [1, 6, 7],
    [9, 8, 6],
  ];

  const letters = [
    "C",
    "A",
    "R",
    "T",
    "D",
    "O",
    "G",
    "S",
    "E",
    "R",
    "G",
    "H",
    "E",
    "N",
    "G",
    "H",
  ];

  expect(determineShapePreference(shape1, shape2, letters)).toBe(1);

  expect(determineShapePreference(shape2, shape1, letters)).toBe(-1);
});

test("If the number of terminal 'S's are equal and number of shapes are equal, prefer the first shape", () => {
  const shape1 = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
  ];
  const shape2 = [
    [0, 5, 4],
    [1, 6, 7],
  ];

  const letters = [
    "C",
    "A",
    "R",
    "T",
    "D",
    "O",
    "G",
    "S",
    "E",
    "R",
    "G",
    "H",
    "E",
    "N",
    "G",
    "H",
  ];

  expect(determineShapePreference(shape1, shape2, letters)).toBe(1);

  expect(determineShapePreference(shape2, shape1, letters)).toBe(1);
});
