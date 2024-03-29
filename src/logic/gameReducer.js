import cloneDeep from "lodash.clonedeep";
import {gameInit} from "./gameInit";
import sendAnalytics from "../common/sendAnalytics";
import {checkIfNeighbors, isKnown} from "@skedwards88/word_logic";
import {trie} from "./trie";
import {indexesToWord} from "./indexesToWord";
import {shapesMatchQ} from "./shapesMatchQ";
import {shapeIsSolvedQ} from "./shapeIsSolvedQ";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "newGame") {
    return gameInit({...payload, seed: undefined, useSaved: false});
  } else if (payload.action === "startWord") {
    const playedIndex = payload.letterIndex;
    return {
      ...currentGameState,
      playedIndexes: [playedIndex],
      result: "",
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
      result: "",
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
      result: "",
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
        result: word.length > 3 ? "Unknown word" : "",
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

    let newFoundSolutions = cloneDeep(currentGameState.foundSolutions);
    if (matchingShapeIndex != undefined) {
      newFoundSolutions[matchingShapeIndex] = currentGameState.playedIndexes;
    }

    // todo record analytics if game solved
    // todo calculate stats if game solved

    return {
      ...currentGameState,
      playedIndexes: [],
      foundSolutions: newFoundSolutions,
      result: "",
    };
  } else if (payload.action === "todo handle other cases") {
    return {
      ...currentGameState,
    };
  } else {
    console.log(`unknown action: ${payload.action}`);
    return currentGameState;
  }
}
