import {shapeIsSolvedQ} from "./shapeIsSolvedQ";

describe("shapeIsSolvedQ", () => {
  test("Returns true if no indexes are null", () => {
    expect(shapeIsSolvedQ([11, 0, 17, 20, 21])).toBe(true);
  });

  test("Returns false if all indexes are null", () => {
    expect(shapeIsSolvedQ([null, null, null, null])).toBe(false);
  });

  test("Returns false if any indexes are null", () => {
    expect(shapeIsSolvedQ([11, 0, null, 20, 21])).toBe(false);
  });
});
