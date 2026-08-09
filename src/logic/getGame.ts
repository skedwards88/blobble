import seedrandom from "seedrandom";
import {getLettersAndShapes} from "./getLettersAndShapes";
import {orderShapeIdsByPreference} from "./orderShapeIdsByPreference";
import type {LetterQu} from "@skedwards88/word_logic/dist/Types";

export function getGame({
  gridSize,
  minWordLength,
  maxWordLength,
  seed,
}: {
  gridSize: number;
  minWordLength: number;
  maxWordLength: number;
  seed: string;
}): [LetterQu[], number[][], number[][]] {
  // Create a new seedable random number generator
  const pseudoRandomGenerator = seedrandom(seed);

  let letters: LetterQu[];
  let deduplicatedShapeLookup: Record<string, number[][]>;
  let selectedShapes: number[][];
  let officialSolutions: number[][];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log("again");
    [letters, deduplicatedShapeLookup] = getLettersAndShapes({
      gridSize,
      minWordLength,
      maxWordLength,
      pseudoRandomGenerator,
    });
    const shapeIDs = Object.keys(deduplicatedShapeLookup);

    if (shapeIDs.length >= 4) {
      const sortedShapeIDs = orderShapeIdsByPreference(
        deduplicatedShapeLookup,
        letters,
      );

      const selectedShapeIDs = sortedShapeIDs.slice(0, 4);
      // Convert the shape ID back to an array of indexes
      selectedShapes = selectedShapeIDs.map((id) =>
        id.split("-").map((i) => parseInt(i)),
      );
      // the "official" answer is the first word for each selected shape
      officialSolutions = selectedShapeIDs.map(
        (id) => deduplicatedShapeLookup[id][0],
      );
      return [letters, selectedShapes, officialSolutions];
    }
  }
}
