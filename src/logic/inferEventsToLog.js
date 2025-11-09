import {gameIsSolvedQ} from "./gameIsSolvedQ";

export function inferEventsToLog(oldState, newState) {
  let analyticsToLog = [];

  // Hint was requested
  if (oldState.hintTally < newState.hintTally) {
    analyticsToLog.push({eventName: "hint"});
  }

  // Game won
  if (
    gameIsSolvedQ(newState.foundSolutions) &&
    !gameIsSolvedQ(oldState.foundSolutions)
  ) {
    analyticsToLog.push({
      eventName: "completed_game",
      eventInfo: {
        difficultyLevel: newState.difficultyLevel,
        isDaily: newState.isDaily,
        numHints: newState.hintTally,
      },
    });
  }

  // New game generated
  if (oldState.seed !== newState.seed) {
    analyticsToLog.push({
      eventName: "new_game",
      eventInfo: {
        isDaily: newState.isDaily,
        difficultyLevel: newState.difficultyLevel,
      },
    });
  }
  return analyticsToLog;
}
