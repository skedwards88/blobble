import React from "react";
import {Letter} from "./Letter";
import {indexesToWord} from "../logic/indexesToWord";

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
    </div>
  );
}

export default Game;
