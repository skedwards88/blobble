import {gameInit, type GameState} from "./gameInit";
import {checkIfNeighbors, isKnown} from "@skedwards88/word_logic";
import {trie} from "./trie";
import {indexesToWord} from "./indexesToWord";
import {shapesMatchQ} from "./shapesMatchQ";
import {shapeIsSolvedQ} from "./shapeIsSolvedQ";

export type ReducerPayload =
  | {
      action: "newGame";
      difficultyLevel?: number;
      isDaily?: boolean;
    }
  | {
      action: "startWord";
      letterIndex: number;
    }
  | {
      action: "addLetter";
      letterIndex: number;
    }
  | {
      action: "removeLetter";
      letterIndex: number;
    }
  | {
      action: "endWord";
    }
  | {
      action: "hint";
      shapeIndex: number;
    };

export function gameReducer(
  currentGameState: GameState,
  payload: ReducerPayload,
): GameState {
  if (payload.action === "newGame") {
    return gameInit({...payload, seed: undefined, useSaved: false});
  } else if (payload.action === "startWord") {
    const playedIndex = payload.letterIndex;
    return {
      ...currentGameState,
      playedIndexes: [playedIndex],
      lastInvalidWord: null,
    };
  } else if (payload.action === "addLetter") {
    // exit early if a word isn't in progress
    if (!currentGameState.playedIndexes.length) {
      return currentGameState;
    }

    // Don't add the letter if it isn't neighboring the previous letter
    const isNeighboring = checkIfNeighbors({
      indexA:
        currentGameState.playedIndexes[
          currentGameState.playedIndexes.length - 1
        ],
      indexB: payload.letterIndex,
      numColumns: Math.sqrt(currentGameState.letters.length),
      numRows: Math.sqrt(currentGameState.letters.length),
    });
    if (!isNeighboring) {
      return currentGameState;
    }

    const newPlayedIndexes = [
      ...currentGameState.playedIndexes,
      payload.letterIndex,
    ];
    return {
      ...currentGameState,
      playedIndexes: newPlayedIndexes,
      lastInvalidWord: null,
    };
  } else if (payload.action === "removeLetter") {
    // exit early if a word isn't in progress
    if (!currentGameState.playedIndexes.length) {
      return currentGameState;
    }

    // Don't remove a letter if the player didn't go back to the letter before the last letter
    const oldPlayedIndexes = [...currentGameState.playedIndexes];
    const previousPlayedIndex = oldPlayedIndexes[oldPlayedIndexes.length - 2];
    if (previousPlayedIndex !== payload.letterIndex) {
      return currentGameState;
    }

    const newPlayedIndexes = oldPlayedIndexes.slice(
      0,
      oldPlayedIndexes.length - 1,
    );

    return {
      ...currentGameState,
      playedIndexes: newPlayedIndexes,
      lastInvalidWord: null,
    };
  } else if (payload.action === "endWord") {
    // exit early if a word isn't in progress
    if (!currentGameState.playedIndexes.length) {
      return currentGameState;
    }

    const word = indexesToWord(
      currentGameState.playedIndexes,
      currentGameState.letters,
    );

    // Check if it matches the original solution (in case word list changed)
    const matchesSolution = currentGameState.officialSolutions
      .map((solution) => indexesToWord(solution, currentGameState.letters))
      .includes(word);

    // Check for word validity
    const {isWord} = isKnown(word, trie);

    // if it isn't a word or doesn't match the original solution
    // end the word and show and "unknown word" message
    if (!isWord && !matchesSolution) {
      return {
        ...currentGameState,
        playedIndexes: [],
        // store the word in the state so we can log it in the analytics to see if the dictionary should be updated
        lastInvalidWord: word.length >= 3 ? word : null,
      };
    }

    // For each shape,
    // if a match for the shape hasn't been found
    // check if the played indexes match the shape
    let matchingShapeIndex;
    for (let index = 0; index < currentGameState.shapes.length; index++) {
      const shapeIsSolved = shapeIsSolvedQ(
        currentGameState.foundSolutions[index],
      );
      if (shapeIsSolved) {
        continue;
      }
      const shapesMatch = shapesMatchQ({
        indexes1: currentGameState.playedIndexes,
        indexes2: currentGameState.shapes[index],
        gridSize: Math.sqrt(currentGameState.letters.length),
      });
      if (shapesMatch) {
        matchingShapeIndex = index;
        break;
      }
    }

    const newFoundSolutions = structuredClone(currentGameState.foundSolutions);
    if (matchingShapeIndex != undefined) {
      newFoundSolutions[matchingShapeIndex] = currentGameState.playedIndexes;
    }

    return {
      ...currentGameState,
      playedIndexes: [],
      foundSolutions: newFoundSolutions,
      lastInvalidWord: null,
    };
  } else if (payload.action === "hint") {
    // A hint reveals one letter at a time (in order) of the official solution
    const actualSolution =
      currentGameState.officialSolutions[payload.shapeIndex];
    const newFoundSolutions = structuredClone(currentGameState.foundSolutions);
    const hintedSolution = newFoundSolutions[payload.shapeIndex];

    // Since hints may have been given previously, get the next unrevealed index for the hint
    const nextHintIndex = hintedSolution.findIndex(
      (i) => i === null || i === undefined,
    );

    // If all hints have been given for the shape, return
    if (nextHintIndex < 0) {
      return currentGameState;
    }

    // Otherwise, reveal the next letter
    const hintValue = actualSolution[nextHintIndex];
    newFoundSolutions[payload.shapeIndex][nextHintIndex] = hintValue;

    const newHintTally = 1 + (currentGameState.hintTally ?? 0);

    return {
      ...currentGameState,
      foundSolutions: newFoundSolutions,
      hintTally: newHintTally,
    };
  } else {
    console.log(
      `unknown action: ${(payload as unknown as {action: string}).action}`,
    );
    return currentGameState;
  }
}
