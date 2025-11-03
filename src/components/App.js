import React from "react";
import Game from "./Game";
import Rules from "./Rules";
import ControlBar from "./ControlBar";
import {
  handleAppInstalled,
  handleBeforeInstallPrompt,
} from "@skedwards88/shared-components/src/logic/handleInstall";
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
import {getUserId} from "@skedwards88/shared-components/src/logic/getUserId";
import {v4 as uuidv4} from "uuid";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";
import {isRunningStandalone} from "@skedwards88/shared-components/src/logic/isRunningStandalone";

export default function App() {
  // *****
  // Install handling setup
  // *****
  // Set up states that will be used by the handleAppInstalled and handleBeforeInstallPrompt listeners
  const [installPromptEvent, setInstallPromptEvent] = React.useState();
  const [showInstallButton, setShowInstallButton] = React.useState(true);

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
  // *****
  // End install handling setup
  // *****

  // If a query string was passed,
  // parse it to get the data to regenerate the game described by the query string
  const [seed, difficultyLevel] = parseUrlQuery();

  // Determine when the player last visited the game
  // This is used to determine whether to show the rules or an announcement instead of the game
  const lastVisitedYYYYMMDD = JSON.parse(
    localStorage.getItem("blobbleLastVisited"),
  );
  const hasVisitedSinceLastAnnouncement = hasVisitedSince(
    lastVisitedYYYYMMDD,
    "20240429",
  );
  const [lastVisited] = React.useState(getSeedFromDate());
  React.useEffect(() => {
    window.localStorage.setItem(
      "blobbleLastVisited",
      JSON.stringify(lastVisited),
    );
  }, [lastVisited]);

  // Determine what view to show the user
  const savedDisplay = JSON.parse(localStorage.getItem("blobbleDisplay"));
  const [display, setDisplay] = React.useState(
    getInitialState(savedDisplay, hasVisitedSinceLastAnnouncement),
  );

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
    window.localStorage.setItem("blobbleDisplay", JSON.stringify(display));
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

  // ******
  // Start analytics setup
  // ******

  // Store userID so I don't have to read local storage every time
  const userId = getUserId("blobble_uid");

  // Store sessionID as a ref so I have the same session ID until app refresh
  const sessionIdRef = React.useRef(uuidv4());
  const sessionId = sessionIdRef.current;

  // Send analytics on load
  React.useEffect(() => {
    sendAnalyticsCF({
      userId,
      sessionId,
      analyticsToLog: [
        {
          eventName: "app_load",
          // os, browser, and isMobile are parsed on the server from the user agent headers
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          isStandalone: isRunningStandalone(),
          devicePixelRatio: window.devicePixelRatio,
        },
      ],
    });
    // Just run once on app load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Send analytics following reducer updates, if needed
  React.useEffect(() => {
    const analyticsToLog = gameState.analyticsToLog;

    if (!analyticsToLog || !analyticsToLog.length) {
      return;
    }

    sendAnalyticsCF({userId, sessionId, analyticsToLog});
  }, [gameState?.analyticsToLog, sessionId, userId]);

  React.useEffect(() => {
    const analyticsToLog = dailyGameState.analyticsToLog;

    if (!analyticsToLog || !analyticsToLog.length) {
      return;
    }

    sendAnalyticsCF({userId, sessionId, analyticsToLog});
  }, [dailyGameState?.analyticsToLog, sessionId, userId]);

  // ******
  // End analytics setup
  // ******

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
          setInstallPromptEvent={setInstallPromptEvent}
          showInstallButton={showInstallButton}
          installPromptEvent={installPromptEvent}
          googleAppLink={
            "https://play.google.com/store/apps/details?id=blobble.io.github.skedwards88.twa&hl=en_US"
          }
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
            dispatchGameState={dispatchGameState}
            gameState={gameState}
            dailyIsSolved={gameIsSolvedQ(dailyGameState.foundSolutions)}
          ></ControlBar>
          <Game
            dispatchGameState={dispatchGameState}
            gameState={gameState}
          ></Game>
        </div>
      );
  }
}
