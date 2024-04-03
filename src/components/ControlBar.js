import React from "react";
import {handleInstall} from "../common/handleInstall";
import {handleShare} from "../common/handleShare";

// todo delete any unneeded controls
function ControlBar({
  dispatchGameState,
  gameState,
  setDisplay,
  setInstallPromptEvent,
  showInstallButton,
  installPromptEvent,
  dailyIsSolved,
  appName,
  shareText,
  url,
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

      {navigator.canShare ? (
        <button
          id="shareButton"
          className="controlButton"
          onClick={() => {
            handleShare({appName, text: shareText, fullUrl: url});
          }}
        ></button>
      ) : (
        <></>
      )}

      {dailyIsSolved ? (
        <button
          id="calendarButtonSolved"
          className="controlButton"
          onClick={() => {
            // dispatchGameState({action: "clearStreakIfNeeded"});//todo handle this action
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
