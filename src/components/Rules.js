import React from "react";
import packageJson from "../../package.json";

export default function Rules({setDisplay}) {
  return (
    <div className="App rules">
      <h1 id="rulesHeader">Blobble: How to play</h1>
      <p id="rulesText">
        {
          `Swipe the letters to form words that match a given shape. (Shapes cannot be rotated.)

          Tap on a shape to reveal the next letter in the word.`
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
