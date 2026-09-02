import React from "react";
import Game from "./Game";
import Rules from "./Rules";
import ControlBar from "./ControlBar";
import InstallOverview from "@skedwards88/shared-components/src/components/InstallOverview";
import PWAInstall from "@skedwards88/shared-components/src/components/PWAInstall";
import MoreGames from "@skedwards88/shared-components/src/components/MoreGames";
import Settings from "./Settings";
import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";
import {getSeedFromDate} from "@skedwards88/shared-components/src/logic/getSeedFromDate";
import {gameIsSolvedQ} from "../logic/gameIsSolvedQ";
import {getInitialState} from "../logic/getInitialState";
import {hasVisitedSince} from "@skedwards88/shared-components/src/logic/hasVisitedSince";
import {parseUrlQuery} from "../logic/parseUrlQuery";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";
import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import {inferEventsToLog} from "../logic/inferEventsToLog";
import {useInstallPrompt} from "@skedwards88/shared-components/src/logic/handleInstall";
import {
  getFromStorage,
  saveToStorage,
} from "@skedwards88/shared-components/src/logic/safeStorage";

export type DisplayState =
  | "rules"
  | "heart"
  | "installOverview"
  | "pwaInstall"
  | "settings"
  | "daily"
  | "game";

export default function App(): React.JSX.Element {
  const {userId, sessionId} = useMetadataContext();

  // This must live at the top level component, not in InstallOverview where it is used, since the InstallOverview is not rendered initially and therefore misses its chance to attach the listeners
  const {installPromptEvent, showInstallButton, handleInstall} =
    useInstallPrompt({userId, sessionId});

  // If a query string was passed,
  // parse it to get the data to regenerate the game described by the query string
  const [seed, difficultyLevel] = parseUrlQuery();

  // Determine when the player last visited the game
  // This is used to determine whether to show the rules or an announcement instead of the game
  const lastVisitedYYYYMMDD = getFromStorage<string>("blobbleLastVisited");

  const hasVisitedSinceLastAnnouncement = hasVisitedSince(
    lastVisitedYYYYMMDD,
    "20240429",
  );
  const [lastVisited] = React.useState(getSeedFromDate());
  React.useEffect(() => {
    saveToStorage("blobbleLastVisited", lastVisited);
  }, [lastVisited]);

  // Determine what view to show the user
  const savedDisplay = getFromStorage<DisplayState>("blobbleDisplay");
  const [display, setDisplay] = React.useState(
    getInitialState(savedDisplay, hasVisitedSinceLastAnnouncement),
  );

  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {
      ...(seed !== undefined && {seed}),
      ...(difficultyLevel !== undefined && {difficultyLevel}),
    },
    gameInit,
  );

  const [dailyGameState, dailyDispatchGameState] = React.useReducer(
    gameReducer,
    {isDaily: true},
    gameInit,
  );

  const [, setLastOpened] = React.useState(Date.now());

  function handleVisibilityChange(): void {
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

    return (): void => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  React.useEffect(() => {
    saveToStorage("blobbleDisplay", display);
  }, [display]);

  React.useEffect(() => {
    saveToStorage("blobbleGameSavedState", gameState);
  }, [gameState]);

  React.useEffect(() => {
    saveToStorage("blobbleDailySavedState", dailyGameState);
  }, [dailyGameState]);

  // Store the previous state so that we can infer which analytics events to send
  const previousGameStateRef = React.useRef(gameState);
  const previousDailyGameStateRef = React.useRef(dailyGameState);

  // Send analytics following reducer updates, if needed
  React.useEffect(() => {
    const previousState = previousGameStateRef.current;

    const analyticsToLog = inferEventsToLog(previousState, gameState);

    if (analyticsToLog.length) {
      sendAnalyticsCF({userId, sessionId, analyticsToLog});
    }

    previousGameStateRef.current = gameState;
  }, [gameState, sessionId, userId]);

  React.useEffect(() => {
    const previousState = previousDailyGameStateRef.current;

    const analyticsToLog = inferEventsToLog(previousState, dailyGameState);

    if (analyticsToLog.length) {
      sendAnalyticsCF({userId, sessionId, analyticsToLog});
    }

    previousDailyGameStateRef.current = dailyGameState;
  }, [dailyGameState, sessionId, userId]);

  switch (display) {
    case "rules":
      return <Rules setDisplay={setDisplay}></Rules>;

    case "heart":
      return (
        <MoreGames
          setDisplay={setDisplay}
          games={["crossjig", "lexlet", "wordfall", "gribbles", "logicGrid"]}
          repoName={"blobble"}
          includeExtraInfo={true}
          includeWordAttribution={true}
          googleLink={
            "https://play.google.com/store/apps/details?id=blobble.io.github.skedwards88.twa&hl=en_US"
          }
        ></MoreGames>
      );

    case "installOverview":
      return (
        <InstallOverview
          setDisplay={setDisplay}
          googleAppLink={
            "https://play.google.com/store/apps/details?id=blobble.io.github.skedwards88.twa&hl=en_US"
          }
          userId={userId}
          sessionId={sessionId}
          installPromptEvent={installPromptEvent}
          showInstallButton={showInstallButton}
          handleInstall={handleInstall}
        ></InstallOverview>
      );

    case "pwaInstall":
      return (
        <PWAInstall
          setDisplay={setDisplay}
          googleAppLink={
            "https://play.google.com/store/apps/details?id=blobble.io.github.skedwards88.twa&hl=en_US"
          }
          pwaLink={"https://skedwards88.github.io/blobble"}
          userId={userId}
          sessionId={sessionId}
        ></PWAInstall>
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
      if (dailyGameState.seed != getSeedFromDate()) {
        dailyDispatchGameState({
          action: "newGame",
          isDaily: true,
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
            dispatchGameState={dispatchGameState}
            dailyIsSolved={gameIsSolvedQ(dailyGameState.foundSolutions)}
          ></ControlBar>
          <Game
            dispatchGameState={dispatchGameState}
            gameState={gameState}
            isDaily={false}
          ></Game>
        </div>
      );
  }
}
