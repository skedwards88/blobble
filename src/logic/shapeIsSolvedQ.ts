export function shapeIsSolvedQ(foundSolution: (number | null)[]): boolean {
  return foundSolution.every((i) => i != null);
}
