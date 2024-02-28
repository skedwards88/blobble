import React from "react";
import packageJson from "../../package.json";

export default function Rules({setDisplay}) {
  return (
    <div className="App rules">
      <h1 id="rulesHeader">TODO-app-name: How to play</h1>
      <p id="rulesText">
        {"TODO-rules"}</p>
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
