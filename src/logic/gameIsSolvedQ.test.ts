import {gameIsSolvedQ} from "./gameIsSolvedQ";

describe("gameIsSolvedQ", () => {
  test("Returns true if no shapes have null indexes", () => {
    expect(
      gameIsSolvedQ([
        [11, 0, 17, 20, 21],
        [5, 4, 3],
        [11, 15, 3, 2],
        [1, 0, 2, 3],
      ]),
    ).toBe(true);
  });

  test("Returns false if all shapes have null indexes", () => {
    expect(
      gameIsSolvedQ([
        [null, null, null, null, null],
        [null, null, null, null],
        [null, null, null],
        [null, null, null, null],
      ]),
    ).toBe(false);
  });

  test("Returns false if any shapes have null indexes", () => {
    expect(
      gameIsSolvedQ([
        [11, 0, 17, 20, 21],
        [5, 4, 3],
        [11, 0, null, 20, 21],
      ]),
    ).toBe(false);
  });
});
