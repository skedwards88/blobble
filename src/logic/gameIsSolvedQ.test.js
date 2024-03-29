import {gameIsSolvedQ} from "./gameIsSolvedQ";

test("Returns true if no shapes have undefined indexes", () => {
  expect(
    gameIsSolvedQ([
      [11, 0, 17, 20, 21],
      [5, 4, 3],
      [11, 15, 3, 2],
      [1, 0, 2, 3],
    ]),
  ).toBe(true);
});

test("Returns false if all shapes have undefined indexes", () => {
  expect(
    gameIsSolvedQ([
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined][
        (undefined, undefined, undefined, undefined)
      ],
    ]),
  ).toBe(false);
});

test("Returns false if any shapes have undefined indexes", () => {
  expect(
    gameIsSolvedQ([
      [11, 0, 17, 20, 21],
      [5, 4, 3],
      [11, 0, undefined, 20, 21],
    ]),
  ).toBe(false);
});
