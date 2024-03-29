import {shapeIsSolvedQ} from "./shapeIsSolvedQ";

export function gameIsSolvedQ(foundSolutions) {
  return foundSolutions.every((foundSolution) => shapeIsSolvedQ(foundSolution));
}
