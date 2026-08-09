import {shapeIsSolvedQ} from "./shapeIsSolvedQ";

export function gameIsSolvedQ(
  foundSolutions: (number | undefined)[][],
): boolean {
  return foundSolutions.every((foundSolution) => shapeIsSolvedQ(foundSolution));
}
