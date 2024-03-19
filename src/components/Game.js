import React from "react";
import {Letter} from "./Letter";

function ShapeBox({filled}) {
  const className = filled ? "shapeBox filled" : "shapeBox";
  return <div className={className}></div>;
}

function Shape({shape, gridSize}) {
  const emptyGrid = Array(gridSize * gridSize).fill();

  const boxes = emptyGrid.map((i, index) => (
    <ShapeBox filled={shape.includes(index)} key={index}></ShapeBox>
  ));

  return <div className="shape">{boxes}</div>;
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
        {gameState.playedIndexes
          .map((index) => gameState.letters[index])
          .join("")
          .toUpperCase()}
      </div>
      {gameState.result ? (
        <div id="wordResult" className="fadeOut">
          {gameState.result}
        </div>
      ) : (
        <></>
      )}

      <div id="shapes">
        {gameState.shapes.map((shape) => (
          <Shape
            shape={shape}
            gridSize={Math.sqrt(gameState.letters.length)}
            key={shape.join("-")}
          ></Shape>
        ))}
      </div>
    </div>
  );
}

export default Game;
