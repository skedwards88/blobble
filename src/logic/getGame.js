import seedrandom from "seedrandom";
import {getLettersAndShapes} from "./getLettersAndShapes";
import {orderShapeIdsByPreference} from "./orderShapeIdsByPreference";

export function getGame({gridSize, minWordLength, maxWordLength, seed}) {
  // Create a new seedable random number generator
  let pseudoRandomGenerator = seedrandom(seed);

  let foundPlayableGame = false;
  let letters;
  let deduplicatedShapeLookup;
  let selectedShapes;
  let officialSolutions;

  while (!foundPlayableGame) {
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

      foundPlayableGame = true;
      const selectedShapeIDs = sortedShapeIDs.slice(0, 4);
      // Convert the shape ID back to an array of indexes
      selectedShapes = selectedShapeIDs.map((id) =>
        id.split("-").map((i) => parseInt(i)),
      );
      // the "official" answer is the first word for each selected shape
      officialSolutions = selectedShapeIDs.map(
        (id) => deduplicatedShapeLookup[id][0],
      );
    } else {
      continue;
    }
  }

  return [letters, selectedShapes, officialSolutions];
}
