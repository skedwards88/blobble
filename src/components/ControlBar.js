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
      {/* todo undisable both calendar buttons below */}
      {dailyIsSolved ? (
        <button
          disabled
          id="calendarButtonSolved"
          className="controlButton"
          onClick={() => {
            dispatchGameState({action: "clearStreakIfNeeded"});
            setDisplay("daily");
          }}
        ></button>
      ) : (
        <button
          disabled
          id="calendarButton"
          className="controlButton"
          onClick={() => setDisplay("daily")}
        ></button>
      )}

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
