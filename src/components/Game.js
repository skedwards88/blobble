import React from "react";
import {Letter} from "./Letter";
import {Shape} from "./Shape";
import {indexesToWord} from "../logic/indexesToWord";
import {gameIsSolvedQ} from "../logic/gameIsSolvedQ";
import {handleShare} from "../common/handleShare";

function GameOver({gameState, dispatchGameState}) {
  return (
    <div className="gameOver">
      {navigator.canShare ? (
        <button
          id="shareButton"
          onClick={() => {
            handleShare({
              appName: "Blobble",
              text: "Check out this word puzzle!",
              fullUrl: "TODO url plus seed",
            });
          }}
        ></button>
      ) : (
        <></>
      )}
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

function Game({dispatchGameState, gameState}) {
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
          ></Shape>
        ))}
      </div>

      {gameOver ? (
        <GameOver
          gameState={gameState}
          dispatchGameState={dispatchGameState}
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
