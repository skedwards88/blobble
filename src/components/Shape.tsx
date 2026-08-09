import type {LetterQu} from "@skedwards88/word_logic/dist/Types";
import {type ReducerPayload} from "../logic/gameReducer";
import {indexesToWord} from "../logic/indexesToWord";

function ShapeBox({
  filled,
  solved,
  dispatchGameState,
  shapeIndex,
}: {
  filled: boolean;
  solved: boolean;
  dispatchGameState: React.Dispatch<ReducerPayload>;
  shapeIndex: number;
}): React.JSX.Element {
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
          ? (): void => {
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
}: {
  shape: number[];
  foundSolution: (number | undefined)[];
  gridSize: number;
  letters: LetterQu[];
  dispatchGameState: React.Dispatch<ReducerPayload>;
  shapeIndex: number;
}): React.JSX.Element {
  const shapeIsSolved = foundSolution.every((i) => i != undefined);
  const emptyGrid = Array(gridSize * gridSize).fill(undefined);

  const boxes = emptyGrid.map((_, index) => (
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
