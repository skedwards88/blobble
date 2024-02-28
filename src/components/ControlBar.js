import React from "react";
import {handleInstall} from "../common/handleInstall";

// todo delete any unneeded controls
function ControlBar({
  dispatchGameState,
  gameState,
  setDisplay,
  setInstallPromptEvent,
  showInstallButton,
  installPromptEvent,
  dailyIsSolved,
}) {
  return (
    <div id="controls">
      <button
        id="newGameButton"
        className="controlButton"
        onClick={() => {
          dispatchGameState({
            ...gameState,
            action: "newGame",
          });
        }}
      ></button>
      <button
        id="helpButton"
        className="controlButton"
        disabled={gameState.gameIsSolved}
        onClick={() => dispatchGameState({action: "getHint"})}
      ></button>
      <button
        id="settingsButton"
        className="controlButton"
        onClick={() => setDisplay("settings")}
      ></button>
      <button
        id="rulesButton"
        className="controlButton"
        onClick={() => setDisplay("rules")}
      ></button>
      <button
        id="heartButton"
        className="controlButton"
        onClick={() => setDisplay("heart")}
      ></button>
      {dailyIsSolved ? (
        <button
          id="calendarButtonSolved"
          className="controlButton"
          onClick={() => {
            dispatchGameState({action: "clearStreakIfNeeded"});
            setDisplay("daily");
          }}
        ></button>
      ) : (
        <button
          id="calendarButton"
          className="controlButton"
          onClick={() => setDisplay("daily")}
        ></button>
      )}

      {navigator.canShare ? (
        <button
          id="shareButton"
          onClick={() => {
            timerDispatch({action: "pause"});
            setDisplay("pause");
            handleShare({
              text: "Try out this Gribbles puzzle:",
              seed: `${gameState.seed}_${Math.sqrt(gameState.letters.length)}_${
                gameState.minWordLength
              }_${gameState.easyMode ? "e" : "h"}`,
            });
          }}
        ></button>
      ) : (
        <></>
      )}

      {showInstallButton && installPromptEvent ? (
        <button
          id="installButton"
          className="controlButton"
          onClick={() =>
            handleInstall(installPromptEvent, setInstallPromptEvent)
          }
        ></button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ControlBar;
