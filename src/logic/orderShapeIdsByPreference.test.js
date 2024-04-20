import {orderShapeIdsByPreference} from "./orderShapeIdsByPreference";

test("Order the shapes by the preferences set by determineShapePreference", () => {
  const shapeLookup = {
    "1-1-1": [
      // 2 words, 1 S
      [0, 1, 2, 3], // CART
      [4, 5, 6, 7], // DOGS
    ],
    "2-2-2": [
      // 2 words, 1 S
      [0, 5, 4], // COD
      [1, 6, 7], // AGS
    ],
    "3-3-3": [
      // 2 words, no S
      [8, 9, 10, 11], // ERGH
      [12, 13, 14, 15], // ENGH
    ],
    "4-4-4": [
      // 3 words, no S
      [8, 9, 10, 11], // ERGH
      [12, 13, 14, 15], // ENGH
      [11, 10, 9, 8], // HGRE
    ],
    "5-5-5": [
      // 3 words, no S
      [0, 1, 2, 3], // CART
      [12, 13, 14, 15], // ENGH
      [11, 10, 9, 8], // HGRE
    ],
  };

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

  expect(orderShapeIdsByPreference(shapeLookup, letters)).toEqual([
    "4-4-4",
    "5-5-5",
    "3-3-3",
    "1-1-1",
    "2-2-2",
  ]);
});

test("Works with a single shape", () => {
  const shapeLookup = {
    "1-1-1": [
      // 2 words, 1 S
      [0, 1, 2, 3], // CART
      [4, 5, 6, 7], // DOGS
    ],
  };

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

  expect(orderShapeIdsByPreference(shapeLookup, letters)).toEqual(["1-1-1"]);
});
