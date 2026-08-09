export function shapeIsSolvedQ(foundSolution: (number | undefined)[]): boolean {
  return foundSolution.every((i) => i != undefined);
}
