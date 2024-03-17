import sendAnalytics from "../common/sendAnalytics";
import getRandomSeed from "../common/getRandomSeed";
import getDailySeed from "../common/getDailySeed";
import {getGame} from "./getGame";

export function gameInit({useSaved = true, isDaily = false, seed}) {
  if (isDaily) {
    // todo remove
    return {}
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

  const [letters, shapes] = getGame({gridSize});

  return {
    // todo return game state
    seed,
    letters,
    shapes,
    playedIndexes: [],
    result: "",
  };
}
