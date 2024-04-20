import {getNumberOfWordsEndingInSingleS} from "./getNumberOfWordsEndingInSingleS";

test("returns the number of words that end in a single 'S'", () => {
  const words = ["CATS", "DOGS", "CAT", "DOG", "HISS", "HISSES", "HIS"];

  expect(getNumberOfWordsEndingInSingleS(words)).toBe(4);
});

test("ignores words that end in a multiple 'S'", () => {
  const words = ["PASS", "MISS", "MISSS", "MISSS"];

  expect(getNumberOfWordsEndingInSingleS(words)).toBe(0);
});

test("returns 0 if no words end in a single 'S", () => {
  const words = ["PASS", "CAT", "CATERPILLAR", "BUTTERFLY"];

  expect(getNumberOfWordsEndingInSingleS(words)).toBe(0);
});
