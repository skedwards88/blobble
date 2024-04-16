import {findIncompatibleShapeIdIfAny} from "./findIncompatibleShapeIdIfAny";

test("If two shapes share a word, the ID for the shape with the most words is returned", () => {
  const wordsForShape1 = new Set(["CAT", "DOG"]);
  const wordsForShape2 = new Set(["COW", "HORSE", "DOG"]);

  expect(
    findIncompatibleShapeIdIfAny(
      wordsForShape1,
      wordsForShape2,
      "1-1-1",
      "2-2-2",
    ),
  ).toBe("2-2-2");

  expect(
    findIncompatibleShapeIdIfAny(
      wordsForShape2,
      wordsForShape1,
      "1-1-1",
      "2-2-2",
    ),
  ).toBe("1-1-1");
});

test("If two shapes share a word, and the shapes are the same length, the ID for the second shape is returned", () => {
  const wordsForShape1 = new Set(["CAT", "DOG", "ANIMAL"]);
  const wordsForShape2 = new Set(["COW", "HORSE", "DOG"]);

  expect(
    findIncompatibleShapeIdIfAny(
      wordsForShape1,
      wordsForShape2,
      "1-1-1",
      "2-2-2",
    ),
  ).toBe("2-2-2");

  expect(
    findIncompatibleShapeIdIfAny(
      wordsForShape2,
      wordsForShape1,
      "1-1-1",
      "2-2-2",
    ),
  ).toBe("2-2-2");
});

test("If two shapes share a word with 'S' appended to one, the ID for the shape with the 'S' appended to the word is returned", () => {
  const wordsForShape1 = new Set(["CAT", "DOGS"]);
  const wordsForShape2 = new Set(["COW", "HORSE", "DOG"]);

  expect(
    findIncompatibleShapeIdIfAny(
      wordsForShape1,
      wordsForShape2,
      "1-1-1",
      "2-2-2",
    ),
  ).toBe("1-1-1");

  expect(
    findIncompatibleShapeIdIfAny(
      wordsForShape2,
      wordsForShape1,
      "1-1-1",
      "2-2-2",
    ),
  ).toBe("2-2-2");
});

test("If two shapes don't share a word, no ID is returned", () => {
  const wordsForShape1 = new Set(["CAT", "DOGS"]);
  const wordsForShape2 = new Set(["COW", "HORSE", "DOGGIE"]);

  expect(
    findIncompatibleShapeIdIfAny(
      wordsForShape1,
      wordsForShape2,
      "1-1-1",
      "2-2-2",
    ),
  ).toBe(undefined);
});
