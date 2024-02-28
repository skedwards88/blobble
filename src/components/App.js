import React from "react";
import Game from "./Game";
import Heart from "./Heart";
import Rules from "./Rules";
import Stats from "./Stats";
import ControlBar from "./ControlBar";
import {
  handleAppInstalled,
  handleBeforeInstallPrompt,
} from "../common/handleInstall";
import Settings from "./Settings";
import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";
import getDailySeed from "../common/getDailySeed";

function parseUrlQuery() {
  const searchParams = new URLSearchParams(document.location.search);
  const query = searchParams.get("id");

  // TODO-parse query. Example below
  // The seed query consists of two parts: the seed and the min number of letters, separated by an underscore
  let numLetters;
  let seed;
  if (query) {
    [seed, numLetters] = query.split("_");
    numLetters = parseInt(numLetters);
  }

  return [seed, numLetters]
}

export default function App() {

  // TODO enter the actual return values
  const [seed, numLetters] = parseUrlQuery();

  // TODO enter value of the saved display state. If no daily challenge, remove daily logic.
  const savedDisplay = JSON.parse(localStorage.getItem("blobbleDisplaySavedStateName"));
  const [display, setDisplay] = React.useState(
    savedDisplay === "game" || savedDisplay === "daily" ? savedDisplay : "game",
  );

  const [installPromptEvent, setInstallPromptEvent] = React.useState();
  const [showInstallButton, setShowInstallButton] = React.useState(true);

  // TODO update values passed to inits. If no daily challenge, remove daily logic.
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {
      seed,
      numLetters,
    },
    gameInit,
  );

  let [dailyGameState, dailyDispatchGameState] = React.useReducer(
    gameReducer,
    {isDaily: true},
    gameInit,
  );

  // TODO If no daily challenge, remove this.
  const [, setLastOpened] = React.useState(Date.now());

  // TODO If no daily challenge, remove this.
  function handleVisibilityChange() {
    // If the visibility of the app changes to become visible,
    // update the state to force the app to re-render.
    // This is to help the daily challenge refresh if the app has
    // been open in the background since an earlier challenge.
    if (!document.hidden) {
      setLastOpened(Date.now());
    }
  }

  // TODO If no daily challenge, remove this.
  React.useEffect(() => {
    // When the component is mounted, attach the visibility change event listener
    // (and remove the event listener when the component is unmounted).
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  React.useEffect(() => {
    // Need to store the function in a variable so that
    // the add and remove actions can reference the same function
    const listener = (event) => handleBeforeInstallPrompt(
      event,
      setInstallPromptEvent,
      setShowInstallButton,
    );

    window.addEventListener("beforeinstallprompt", listener);

    return () =>
      window.removeEventListener("beforeinstallprompt", listener);
  }, []);

  React.useEffect(() => {
    // Need to store the function in a variable so that
    // the add and remove actions can reference the same function
    const listener = () => handleAppInstalled(setInstallPromptEvent, setShowInstallButton);

    window.addEventListener("appinstalled", listener);
    return () => window.removeEventListener("appinstalled", listener);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("blobbleDisplaySavedStateName", JSON.stringify(display));
  }, [display]);

  React.useEffect(() => {
    window.localStorage.setItem("blobbleGameSavedStateName", JSON.stringify(gameState));
  }, [gameState]);

  React.useEffect(() => {
    window.localStorage.setItem(
      "blobbleDailySavedStateName",
      JSON.stringify(dailyGameState),
    );
  }, [dailyGameState]);

  switch (display) {
    case "rules":
      return <Rules setDisplay={setDisplay}></Rules>;

    case "heart":
      return <Heart
        setDisplay={setDisplay}
        appName="Blobble"
        shareText="Check out this word puzzle!"
        repoName="blobble"
        url="https://skedwards88.github.io/blobble"
      />;

    case "settings":
      return (
        <Settings
          setDisplay={setDisplay}
          dispatchGameState={dispatchGameState}
          gameState={gameState}
        />
      );

    // todo remove if no daily challenge
    case "daily":
      // force reinitialize the daily state if the day has changed
      if (dailyGameState.seed != getDailySeed()) {
        dailyDispatchGameState({
          action: "newGame",
          isDaily: true,
          useSaved: false,
        });
      }
      return (
        <div className="App" id="blobble">
          <div id="exitDaily">
            <button
              id="helpButton"
              className="controlButton"
              disabled={dailyGameState.gameIsSolved}
              onClick={() => dailyDispatchGameState({action: "getHint"})}
            ></button>
            <button id="exitDailyButton" onClick={() => setDisplay("game")}>
              Exit daily challenge
            </button>
          </div>
          <Game
            dispatchGameState={dailyDispatchGameState}
            gameState={{
              ...dailyGameState,
              indicateValidity: gameState?.indicateValidity ?? false,
            }}
            setDisplay={setDisplay}
          ></Game>
        </div>
      );

    case "dailyStats":
      return (
        <Stats setDisplay={setDisplay} stats={dailyGameState.stats}></Stats>
      );

    default:
      return (
        <div className="App" id="blobble">
          <ControlBar
            setDisplay={setDisplay}
            setInstallPromptEvent={setInstallPromptEvent}
            showInstallButton={showInstallButton}
            installPromptEvent={installPromptEvent}
            dispatchGameState={dispatchGameState}
            gameState={gameState}
            dailyIsSolved={dailyGameState.gameIsSolved}
          ></ControlBar>
          <Game
            dispatchGameState={dispatchGameState}
            gameState={gameState}
          ></Game>
        </div>
      );
  }
}
