import Share from "@skedwards88/shared-components/src/components/Share";
import {isRunningStandalone} from "@skedwards88/shared-components/src/logic/isRunningStandalone";
import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import type {ReducerPayload} from "../logic/gameReducer";
import type {DisplayState} from "./App";

function ControlBar({
  dispatchGameState,
  setDisplay,
  dailyIsSolved,
}: {
  dispatchGameState: React.Dispatch<ReducerPayload>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
  dailyIsSolved: boolean;
}): React.JSX.Element {
  const {userId, sessionId} = useMetadataContext();

  return (
    <div id="controls">
      <button
        id="newGameButton"
        className="controlButton"
        onClick={() => {
          dispatchGameState({
            action: "newGame",
          });
        }}
      />
      <button
        id="settingsButton"
        className="controlButton"
        onClick={() => {
          setDisplay("settings");
        }}
      />
      <button
        id="rulesButton"
        className="controlButton"
        onClick={() => {
          setDisplay("rules");
        }}
      />
      <button
        id="heartButton"
        className="controlButton"
        onClick={() => {
          setDisplay("heart");
        }}
      />

      <Share
        appName="Blobble"
        text="Check out this word puzzle!"
        url="https://blobble.twistedtrailgames.com"
        origin="control bar"
        id="shareButton"
        className="controlButton"
        userId={userId}
        sessionId={sessionId}
      />

      {dailyIsSolved ? (
        <button
          id="calendarButtonSolved"
          className="controlButton"
          onClick={() => {
            setDisplay("daily");
          }}
        />
      ) : (
        <button
          id="calendarButton"
          className="controlButton"
          onClick={() => {
            setDisplay("daily");
          }}
        />
      )}

      {!isRunningStandalone() ? (
        <button
          id="installButton"
          className="controlButton"
          onClick={() => {
            setDisplay("installOverview");
          }}
        />
      ) : null}
    </div>
  );
}

export default ControlBar;
