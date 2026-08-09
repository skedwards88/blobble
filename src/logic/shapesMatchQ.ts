import {arraysMatchQ} from "@skedwards88/word_logic";
import {centerIndexes} from "./centerIndexes";

export function shapesMatchQ({
  indexes1,
  indexes2,
  gridSize,
}: {
  indexes1: number[];
  indexes2: number[];
  gridSize: number;
}): boolean {
  const normalizedIndexes1 = centerIndexes(indexes1, gridSize);
  const normalizedIndexes2 = centerIndexes(indexes2, gridSize);

  return arraysMatchQ(normalizedIndexes1, normalizedIndexes2);
}
