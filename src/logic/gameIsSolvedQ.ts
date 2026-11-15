import {shapeIsSolvedQ} from "./shapeIsSolvedQ";

export function gameIsSolvedQ(foundSolutions: (number | null)[][]): boolean {
  return foundSolutions.every((foundSolution) => shapeIsSolvedQ(foundSolution));
}
