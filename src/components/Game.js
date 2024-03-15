import React from "react";
import {Letter} from "./Letter";

function Game({dispatchGameState, gameState}) {
  console.log("rerender");
  return (
    <div id="game">
      <div id="board">
        {gameState.letters.map((letter, index) => (
          <Letter
            letter={letter}
            index={index}
            letterAvailability={!gameState.playedIndexes.includes(index)} // todo make false if gameover?
            dispatchGameState={dispatchGameState}
            draggable={false}
            key={index}
          ></Letter>
        ))}
      </div>
      <div>
        {gameState.playedIndexes
          .map((index) => gameState.letters[index])
          .join("")
          .toUpperCase()}
      </div>
      <div>{gameState.result}</div>
    </div>
  );
}

export default Game;
