import seedrandom from "seedrandom";
import {getLettersAndShapes} from "./getLettersAndShapes";

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
      // todo instead of just taking first 4, do I want to add preference for more/fewer solutions or shapes with the most difference in morphology?
      foundPlayableGame = true;
      const selectedShapeIDs = shapeIDs.slice(0, 4);
      selectedShapes = selectedShapeIDs.map((id) =>
        id.split("-").map((i) => parseInt(i)),
      ); // todo make more elegant
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
