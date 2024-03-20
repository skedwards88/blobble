import {shiftIndexesToTopLeft} from "./shiftIndexesToTopLeft";
import isEqual from "lodash.isequal";

export function shapesMatchQ({indexes1, indexes2, gridSize}) {
  const normalizedIndexes1 = shiftIndexesToTopLeft(indexes1, gridSize);
  const normalizedIndexes2 = shiftIndexesToTopLeft(indexes2, gridSize);

  return isEqual(normalizedIndexes1, normalizedIndexes2);
}
