import type {DisplayState} from "../components/App";

export function getInitialState(
  savedDisplay: DisplayState | undefined,
  hasVisited: boolean,
): DisplayState {
  if (!hasVisited) {
    return "rules";
  }

  if (savedDisplay === "game" || savedDisplay === "daily") {
    return savedDisplay;
  }

  return "game";
}
