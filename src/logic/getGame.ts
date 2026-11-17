import seedrandom from "seedrandom";
import {getLettersAndShapes} from "./getLettersAndShapes";
import {orderShapeIdsByPreference} from "./orderShapeIdsByPreference";
import type {LetterQu} from "@skedwards88/word_logic/dist/Types";
import type {Clue} from "./gameInit";

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
}): [LetterQu[], Clue[]] {
  // Create a new seedable random number generator
  const pseudoRandomGenerator = seedrandom(seed);

  let letters: LetterQu[];
  let deduplicatedShapeLookup: Record<string, number[][]>;
  let clues: Clue[];

  while (true) {
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

      clues = selectedShapeIDs.map((id) => {
        // Convert the shape ID back to an array of indexes
        const shape = id.split("-").map((i) => parseInt(i));

        // the "official" answer is the first word for each selected shape
        const officialSolution = deduplicatedShapeLookup[id]?.[0];

        // This should never get hit but is required to satisfy TS
        if (officialSolution === undefined) {
          throw new Error(`shape ID not found in lookup`);
        }

        // The found answer is all nulls at this point
        const foundSolution = shape.map(() => null);

        return {
          shape,
          officialSolution,
          foundSolution,
        };
      });

      return [letters, clues];
    }
  }
}
