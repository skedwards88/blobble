import sendAnalytics from "../common/sendAnalytics";
import getRandomSeed from "../common/getRandomSeed";
import getDailySeed from "../common/getDailySeed";

export function gameInit({
  useSaved = true,
  isDaily = false,
  seed,
}) {
  const savedStateName = isDaily ? "TODODailySavedStateName" : "TODOGameSavedStateName";

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
    return savedState;
  }

  sendAnalytics("new_game");

  return {
    // todo return game state
  };
}
