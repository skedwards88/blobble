import sendAnalytics from "../common/sendAnalytics";
import getRandomSeed from "../common/getRandomSeed";
import getDailySeed from "../common/getDailySeed";
import {getGame} from "./getGame";

export function gameInit({useSaved = true, isDaily = false, seed}) {
  if (isDaily) {
    // todo remove
    return {};
  }
  const savedStateName = isDaily
    ? "blobbleDailySavedStateName"
    : "blobbleGameSavedStateName";

  if (isDaily) {
    seed = getDailySeed();
  }

  if (!seed) {
    seed = getRandomSeed();
  }

  const savedState = useSaved
    ? JSON.parse(localStorage.getItem(savedStateName))
    : undefined;

  if (
    savedState
    // todo enter other requirements for using saved state here
  ) {
    // todo uncomment return
    // return savedState;
  }

  sendAnalytics("new_game");

  const gridSize = 4;
  const minWordLength = 4; // todo don't hardcode
  const maxWordLength = 4; // todo don't hardcode

  const [letters, shapes, officialSolutions] = getGame({
    gridSize,
    minWordLength,
    maxWordLength,
    seed,
  });

  console.log(
    officialSolutions.map((solution) =>
      solution.map((index) => letters[index]).join(""),
    ),
  );

  const foundSolutions = shapes.map((shape) => shape.map(() => undefined));

  return {
    seed,
    letters,
    shapes,
    // official solutions is an array of array of indexes where the index order matches the word order
    officialSolutions,
    foundSolutions,
    playedIndexes: [],
    result: "",
  };
}
