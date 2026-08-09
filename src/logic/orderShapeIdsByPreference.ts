import type {LetterQu} from "@skedwards88/word_logic/dist/Types";
import {determineShapePreference} from "./determineShapePreference";

export function orderShapeIdsByPreference(
  shapeLookup: Record<string, number[][]>,
  letters: LetterQu[],
): string[] {
  const shapeIds = Object.keys(shapeLookup);

  shapeIds.sort((shapeId1, shapeId2) =>
    determineShapePreference(
      shapeLookup[shapeId1],
      shapeLookup[shapeId2],
      letters,
    ),
  );

  return shapeIds;
}
