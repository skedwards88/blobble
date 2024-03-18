import React from "react";

function handlePointerDown(event, index, dispatchGameState) {
  event.preventDefault();
  event.target.releasePointerCapture(event.pointerId);
  dispatchGameState({
    action: "startWord",
    letterIndex: index,
  });
}

function handlePointerEnter(
  event,
  index,
  letterAvailability,
  dispatchGameState,
) {
  event.preventDefault();
  if (!letterAvailability) {
    dispatchGameState({
      action: "removeLetter",
      letterIndex: index,
    });
  } else {
    dispatchGameState({
      action: "addLetter",
      letterIndex: index,
    });
  }
}

function handlePointerUp(event, dispatchGameState) {
  event.preventDefault();
  dispatchGameState({
    action: "endWord",
  });
}

export function Letter({letter, index, letterAvailability, dispatchGameState}) {
  const letterRef = React.useRef();

  React.useLayoutEffect(() => {
    const letterDiv = letterRef.current;
    let classes = letterDiv.className
      .split(" ")
      .filter((entry) => entry != "unavailable");
    if (!letterAvailability) {
      classes.push("unavailable");
    }
    const newClassName = classes.join(" ");

    letterDiv.className = newClassName;
  }, [letterAvailability]);

  return (
    // Use two different elements for the letter and the background so that touching the edge of a box won't select the letter (without us having to constantly monitor and calculate the pointer position)
    <div ref={letterRef} className="letterBox">
      <div
        className="letter"
        onPointerDown={(event) =>
          handlePointerDown(event, index, dispatchGameState)
        }
        onPointerEnter={(event) =>
          handlePointerEnter(
            event,
            index,
            letterAvailability,
            dispatchGameState,
          )
        }
        onPointerUp={(event) => handlePointerUp(event, dispatchGameState)}
      >
        {letter}
      </div>
    </div>
  );
}
