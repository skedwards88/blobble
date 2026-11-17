import type {LetterQu} from "@skedwards88/word_logic/dist/Types";
import {determineShapePreference} from "./determineShapePreference";

export function orderShapeIdsByPreference(
  shapeLookup: Record<string, number[][]>,
  letters: LetterQu[],
): string[] {
  const shapeEntries = Object.entries(shapeLookup);

  shapeEntries.sort(([, shape1], [, shape2]) =>
    determineShapePreference(shape1, shape2, letters),
  );

  return shapeEntries.map(([key]) => key);
}
