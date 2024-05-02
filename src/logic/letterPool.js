import {getLetterPool} from "@skedwards88/word_logic";
import {
  commonWordsLen3,
  commonWordsLen4,
  commonWordsLen5,
  commonWordsLen6,
} from "@skedwards88/word_lists";

export const letterPool = getLetterPool([
  ...commonWordsLen3,
  ...commonWordsLen4,
  ...commonWordsLen5,
  ...commonWordsLen6,
]);
