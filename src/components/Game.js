import React from "react";
import {Letter} from "./Letter";
import {indexesToWord} from "../logic/indexesToWord";
import {gameIsSolvedQ} from "../logic/gameIsSolvedQ";
import Share from "./Share";

function ShapeBox({filled, solved}) {
  let className = "shapeBox";
  if (filled) {
    className += " filled";
    if (solved) {
      className += " solved";
    }
  }

  return <div className={className}></div>;
}

function Shape({shape, foundSolution, gridSize, letters}) {
  const shapeIsSolved = foundSolution.every((i) => i != undefined);
  const emptyGrid = Array(gridSize * gridSize).fill();

  const boxes = emptyGrid.map((i, index) => (
    <ShapeBox
      filled={shape.includes(index)}
      solved={shapeIsSolved}
      key={index}
    ></ShapeBox>
  ));

  const word = indexesToWord(foundSolution, letters);

  return (
    <div className="shape">
      {boxes}
      <div className="foundWord">{word}</div>
    </div>
  );
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

      <div id="currentWord">
        {indexesToWord(gameState.playedIndexes, gameState.letters)}
      </div>

      {gameState.result ? (
        <div id="wordResult" className="fadeOut">
          {gameState.result}
        </div>
      ) : (
        <></>
      )}

      {gameOver ? (
        <Share
          appName={"appName"}
          text={"shareText"}
          url={"url"}
          className="gameOverShare"
        ></Share>
      ) : (
        <></>
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
