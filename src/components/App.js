import React from "react";
import Game from "./Game";
import Heart from "./Heart";
import Rules from "./Rules";
import ControlBar from "./ControlBar";
import {
  handleAppInstalled,
  handleBeforeInstallPrompt,
} from "../common/handleInstall";
import Settings from "./Settings";
import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";
import getDailySeed from "../common/getDailySeed";
import {gameIsSolvedQ} from "../logic/gameIsSolvedQ";
import {getInitialState} from "../logic/getInitialState";
import {hasVisitedSince} from "../logic/hasVisitedSince";

function parseUrlQuery() {
  const searchParams = new URLSearchParams(document.location.search);
  const query = searchParams.get("id");

  // The seed query consists of two parts: the seed and the difficulty level, separated by an underscore
  let difficultyLevel;
  let seed;
  if (query) {
    [seed, difficultyLevel] = query.split("_");
    difficultyLevel = parseInt(difficultyLevel);
  }

  return [seed, difficultyLevel];
}

export default function App() {
  const [seed, difficultyLevel] = parseUrlQuery();

  const hasVisited = hasVisitedSince();
  const [lastVisited] = React.useState(getDailySeed());
  React.useEffect(() => {
    window.localStorage.setItem(
      "blobbleLastVisited",
      JSON.stringify(lastVisited),
    );
  }, [lastVisited]);

  const savedDisplay = JSON.parse(
    localStorage.getItem("blobbleDisplaySavedStateName"),
  );
  const [display, setDisplay] = React.useState(
    getInitialState(savedDisplay, hasVisited),
  );

  const [installPromptEvent, setInstallPromptEvent] = React.useState();
  const [showInstallButton, setShowInstallButton] = React.useState(true);

  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {
      seed,
      difficultyLevel,
    },
    gameInit,
  );

  let [dailyGameState, dailyDispatchGameState] = React.useReducer(
    gameReducer,
    {isDaily: true},
    gameInit,
  );

  const [, setLastOpened] = React.useState(Date.now());

  function handleVisibilityChange() {
    // If the visibility of the app changes to become visible,
    // update the state to force the app to re-render.
    // This is to help the daily challenge refresh if the app has
    // been open in the background since an earlier challenge.
    if (!document.hidden) {
      setLastOpened(Date.now());
    }
  }

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
    const listener = (event) =>
      handleBeforeInstallPrompt(
        event,
        setInstallPromptEvent,
        setShowInstallButton,
      );

    window.addEventListener("beforeinstallprompt", listener);

    return () => window.removeEventListener("beforeinstallprompt", listener);
  }, []);

  React.useEffect(() => {
    // Need to store the function in a variable so that
    // the add and remove actions can reference the same function
    const listener = () =>
      handleAppInstalled(setInstallPromptEvent, setShowInstallButton);

    window.addEventListener("appinstalled", listener);
    return () => window.removeEventListener("appinstalled", listener);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(
      "blobbleDisplaySavedStateName",
      JSON.stringify(display),
    );
  }, [display]);

  React.useEffect(() => {
    window.localStorage.setItem(
      "blobbleGameSavedState",
      JSON.stringify(gameState),
    );
  }, [gameState]);

  React.useEffect(() => {
    window.localStorage.setItem(
      "blobbleDailySavedState",
      JSON.stringify(dailyGameState),
    );
  }, [dailyGameState]);

  switch (display) {
    case "rules":
      return <Rules setDisplay={setDisplay}></Rules>;

    case "heart":
      return (
        <Heart
          setDisplay={setDisplay}
          appName="Blobble"
          shareText="Check out this word puzzle!"
          repoName="blobble"
          url="https://skedwards88.github.io/blobble"
        />
      );

    case "settings":
      return (
        <Settings
          setDisplay={setDisplay}
          dispatchGameState={dispatchGameState}
          gameState={gameState}
        />
      );

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
        <div
          className="App"
          id="blobble"
          onPointerUp={(event) => {
            event.preventDefault();
            dailyDispatchGameState({
              action: "endWord",
            });
          }}
        >
          <div id="exitDaily">
            <button id="exitDailyButton" onClick={() => setDisplay("game")}>
              Exit daily challenge
            </button>
          </div>
          <Game
            dispatchGameState={dailyDispatchGameState}
            gameState={dailyGameState}
            isDaily={true}
          ></Game>
        </div>
      );

    default:
      return (
        <div
          className="App"
          id="blobble"
          onPointerUp={(event) => {
            event.preventDefault();
            dispatchGameState({
              action: "endWord",
            });
          }}
        >
          <ControlBar
            setDisplay={setDisplay}
            setInstallPromptEvent={setInstallPromptEvent}
            showInstallButton={showInstallButton}
            installPromptEvent={installPromptEvent}
            dispatchGameState={dispatchGameState}
            gameState={gameState}
            dailyIsSolved={gameIsSolvedQ(dailyGameState.foundSolutions)}
            appName="Blobble"
            shareText="Check out this word puzzle!"
            url="https://skedwards88.github.io/blobble"
          ></ControlBar>
          <Game
            dispatchGameState={dispatchGameState}
            gameState={gameState}
          ></Game>
        </div>
      );
  }
}
