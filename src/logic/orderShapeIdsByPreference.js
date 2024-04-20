import { determineShapePreference } from './determineShapePreference';

export function orderShapeIdsByPreference(shapeLookup, letters) {
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
