import React from "react";
import {indexesToWord} from "../logic/indexesToWord";

function ShapeBox({filled, solved, dispatchGameState, shapeIndex}) {
  let className = "shapeBox";
  if (filled) {
    className += " filled";
    if (solved) {
      className += " solved";
    }
  }

  return (
    <div
      className={className}
      onClick={
        filled
          ? () => {
              dispatchGameState({action: "hint", shapeIndex});
            }
          : undefined
      }
    ></div>
  );
}

export function Shape({
  shape,
  foundSolution,
  gridSize,
  letters,
  dispatchGameState,
  shapeIndex,
}) {
  const shapeIsSolved = foundSolution.every((i) => i != undefined);
  const emptyGrid = Array(gridSize * gridSize).fill();

  const boxes = emptyGrid.map((i, index) => (
    <ShapeBox
      filled={shape.includes(index)}
      solved={shapeIsSolved}
      key={index}
      dispatchGameState={dispatchGameState}
      shapeIndex={shapeIndex}
    ></ShapeBox>
  ));

  const word = indexesToWord(foundSolution, letters);

  return (
    <div className="shapeAndWord">
      <div className="shape">{boxes}</div>
      <div className="foundWord">{word}</div>
    </div>
  );
}
