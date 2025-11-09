import React from "react";
import Share from "@skedwards88/shared-components/src/components/Share";
import {isRunningStandalone} from "@skedwards88/shared-components/src/logic/isRunningStandalone";
import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";

function ControlBar({dispatchGameState, gameState, setDisplay, dailyIsSolved}) {
  const {userId, sessionId} = useMetadataContext();

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

      <Share
        appName="Blobble"
        text="Check out this word puzzle!"
        url="https://skedwards88.github.io/blobble/"
        origin="control bar"
        id="shareButton"
        className="controlButton"
        userId={userId}
        sessionId={sessionId}
      ></Share>

      {dailyIsSolved ? (
        <button
          id="calendarButtonSolved"
          className="controlButton"
          onClick={() => {
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

      {!isRunningStandalone() ? (
        <button
          id="installButton"
          className="controlButton"
          onClick={() => setDisplay("installOverview")}
        ></button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ControlBar;
