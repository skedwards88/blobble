import {centerIndexes} from "./centerIndexes";

test("Given indexes in a grid, returns the indexes of the centered input indexes", () => {
  const indexes = [11,15,17,20,21]

  const centeredIndexes = centerIndexes(indexes, 5);

  const expectedIndexes = [7,11,13,16,17]

  expect(centeredIndexes).toEqual(expectedIndexes);
});


test("If the indexes can't be perfectly centered, errs towards the top left", () => {
  const expectedIndexes = [8,13,14,15,20]

  const indexesBottomLeft = [19,24,25,26,31]

  expect(centerIndexes(indexesBottomLeft, 6)).toEqual(expectedIndexes);

  const indexesBottomRight = [22,27,28,29,34]

  expect(centerIndexes(indexesBottomRight, 6)).toEqual(expectedIndexes);

  const indexesTopLeft = [1,6,7,8,13]

  expect(centerIndexes(indexesTopLeft, 6)).toEqual(expectedIndexes);

  const indexesTopRight = [4,9,10,11,16]

  expect(centerIndexes(indexesTopRight, 6)).toEqual(expectedIndexes);
});

test("If the indexes are already centered up/down, will still center right/left", () => {
  const indexes = [6,10,12,15,16]

  const centeredIndexes = centerIndexes(indexes, 5);

  const expectedIndexes = [7,11,13,16,17]

  expect(centeredIndexes).toEqual(expectedIndexes);
});

test("If the indexes are already centered right/left, will still center up/down", () => {
  const indexes = [12,16,18,21,22]

  const centeredIndexes = centerIndexes(indexes, 5);

  const expectedIndexes = [7,11,13,16,17]

  expect(centeredIndexes).toEqual(expectedIndexes);
});
