import {centerIndexes} from "./centerIndexes";
import isEqual from "lodash.isequal";

export function shapesMatchQ({indexes1, indexes2, gridSize}) {
  const normalizedIndexes1 = centerIndexes(indexes1, gridSize);
  const normalizedIndexes2 = centerIndexes(indexes2, gridSize);

  return isEqual(normalizedIndexes1, normalizedIndexes2);
}
