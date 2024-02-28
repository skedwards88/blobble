import React from "react";

export default function Settings({setDisplay, dispatchGameState, gameState}) {
  function handleNewGame(event) {
    event.preventDefault();
    const newNumLetters = event.target.elements.numLetters.value;
    const newIndicateValidity = event.target.elements.indicateValidity.checked;

    dispatchGameState({
      action: "newGame",
      numLetters: newNumLetters,
      indicateValidity: newIndicateValidity,
    });
    setDisplay("game");
  }

  return (
    <form className="App settings" onSubmit={(e) => handleNewGame(e)}>
      <div id="settings">
        <div className="setting">
          {"TODO insert setting"}
        </div>

        <div className="setting">
          {"TODO insert another setting"}
        </div>
      </div>
      <div id="setting-buttons">
        <button type="submit" aria-label="new game">
          New game
        </button>
        <button
          type="button"
          aria-label="cancel"
          onClick={() => setDisplay("game")}
        >
          Return
        </button>
      </div>
    </form>
  );
}
