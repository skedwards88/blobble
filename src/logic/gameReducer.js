import cloneDeep from "lodash.clonedeep";
import {gameInit} from "./gameInit";
import sendAnalytics from "../common/sendAnalytics";
import {checkIfNeighbors, isKnown} from "@skedwards88/word_logic";
import {trie} from "./trie";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "newGame") {
    return gameInit({...payload, seed: undefined, useSaved: false});
  } else if (payload.action === "startWord") {
    const playedIndex = payload.letterIndex;
    return {
      ...currentGameState,
      playedIndexes: [playedIndex],
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
      gridSize: Math.sqrt(currentGameState.letters.length),
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
    };
  } else if (payload.action === "endWord") {
    // exit early if a word isn't in progress
    if (!currentGameState.playedIndexes.length) {
      return currentGameState;
    }

    // todo check if matches original solution (in case word list changed)

    // Check for word validity
    const word = currentGameState.playedIndexes
      .map((index) => currentGameState.letters[index])
      .join("")
      .toUpperCase();
    const {isWord} = isKnown(word, trie);

    // if it isn't a word // todo or doesn't match the original solution
    // end the word and show and "unknown word" message
    if (!isWord) {
      return {
        ...currentGameState,
        playedIndexes: [],
        result: word.length > 3 ? "Unknown word" : "",
      };
    }

    // todo check if it matches a shape
    // todo record analytics if game solved
    // todo calculate stats if game solved

    return {
      ...currentGameState,
      playedIndexes: [],
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
