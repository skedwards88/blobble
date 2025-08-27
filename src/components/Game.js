import React from "react";
import {Letter} from "./Letter";
import {Shape} from "./Shape";
import {indexesToWord} from "../logic/indexesToWord";
import {gameIsSolvedQ} from "../logic/gameIsSolvedQ";
import {assembleShareLink} from "@skedwards88/shared-components/src/logic/assembleShareLink";
import Share from "@skedwards88/shared-components/src/components/Share";

function GameOver({gameState, dispatchGameState, isDaily}) {
  if (isDaily) {
    return <div className="gameMessage">Solved!</div>;
  }

  return (
    <div className="gameOver">
      <Share
        appName="Blobble"
        text="Check out this word puzzle!"
        url={assembleShareLink({
          url: "https://skedwards88.github.io/blobble/",
          seed: `${gameState.seed}_${gameState.difficultyLevel}`,
        })}
        origin="game over"
        id="shareButton"
      ></Share>
      <button
        id="newGameButton"
        onClick={() => {
          dispatchGameState({
            ...gameState,
            action: "newGame",
          });
        }}
      ></button>
    </div>
  );
}

function GameMessage({gameState}) {
  if (gameState.playedIndexes.length) {
    return (
      <div className="gameMessage">
        {indexesToWord(gameState.playedIndexes, gameState.letters)}
      </div>
    );
  }

  if (gameState.result) {
    return <div className="gameMessage fadeOut">{gameState.result}</div>;
  }

  return <div className="gameMessage"></div>;
}

function Game({dispatchGameState, gameState, isDaily}) {
  const gameOver = gameIsSolvedQ(gameState.foundSolutions);

  return (
    <div id="game">
      <div id="shapes">
        {gameState.shapes.map((shape, index) => (
          <Shape
            shape={shape}
            foundSolution={gameState.foundSolutions[index]}
            gridSize={Math.sqrt(gameState.letters.length)}
            letters={gameState.letters}
            key={shape.join("-")}
            dispatchGameState={dispatchGameState}
            shapeIndex={index}
          ></Shape>
        ))}
      </div>

      {gameOver ? (
        <GameOver
          gameState={gameState}
          dispatchGameState={dispatchGameState}
          isDaily={isDaily}
        ></GameOver>
      ) : (
        <GameMessage gameOver={gameOver} gameState={gameState}></GameMessage>
      )}

      <div id="board">
        {gameState.letters.map((letter, index) => (
          <Letter
            letter={letter}
            index={index}
            letterAvailability={
              gameOver ? false : !gameState.playedIndexes.includes(index)
            }
            dispatchGameState={dispatchGameState}
            draggable={false}
            key={index}
          ></Letter>
        ))}
      </div>
    </div>
  );
}

export default Game;
