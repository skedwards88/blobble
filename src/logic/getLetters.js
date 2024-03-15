import {letterPool} from "./letterPool";
import {shuffleArray} from "@skedwards88/word_logic";

export function getLetters(gridSize, pseudoRandomGenerator) {
  // Given the distribution of letters in the word list
  // Choose n letters without substitution
  const shuffledLetters = shuffleArray(letterPool, pseudoRandomGenerator);
  const chosenLetters = shuffledLetters.slice(0, gridSize * gridSize);

  // If there is a "Qu" in the pool,
  // replace the letter above or below (depending on
  // the qu position) randomly with A/E/I/O
  // This skews the letter distribution a bit but
  // gives the Qu a better chance of being used
  const qIndex = chosenLetters.indexOf("Qu");
  if (qIndex > -1) {
    const replacementPosition =
      qIndex < (gridSize * gridSize) / 2
        ? qIndex + gridSize
        : qIndex - gridSize;
    const replacementLetter = shuffleArray(
      ["A", "E", "I", "O"],
      pseudoRandomGenerator,
    )[0];
    chosenLetters[replacementPosition] = replacementLetter;
  }

  return chosenLetters;
}
