import {hasVisitedSince} from "./hasVisitedSince";

export function getInitialState(savedDisplay) {
  const hasVisited = hasVisitedSince();
  if (!hasVisited) {
    return "rules";
  }

  if (savedDisplay === "game" || savedDisplay === "daily") {
    return savedDisplay;
  }

  return "game";
}
