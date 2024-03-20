import React from "react";
import packageJson from "../../package.json";

export default function Rules({setDisplay}) {
  return (
    <div className="App rules">
      <h1 id="rulesHeader">Blobble: How to play</h1>
      <p id="rulesText">
        {
          "TODO-rules You found a game that is still in development! Check back soon for the full game play and rules."
        }
      </p>
      <button
        id="rulesClose"
        className="close"
        onClick={() => {
          setDisplay("game");
        }}
      >
        {"Play"}
      </button>
      <small id="rulesVersion">version {packageJson.version}</small>
    </div>
  );
}
