import {shapeIsSolvedQ} from "./shapeIsSolvedQ";

test("Returns true if no indexes are undefined", () => {
  expect(shapeIsSolvedQ([11, 0, 17, 20, 21])).toBe(true);
});

test("Returns false if all indexes are undefined", () => {
  expect(shapeIsSolvedQ([undefined, undefined, undefined, undefined])).toBe(
    false,
  );
});

test("Returns false if any indexes are undefined", () => {
  expect(shapeIsSolvedQ([11, 0, undefined, 20, 21])).toBe(false);
});
