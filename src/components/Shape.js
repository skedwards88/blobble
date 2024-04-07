import React from "react";
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

export function Shape({shape, foundSolution, gridSize, letters}) {
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
