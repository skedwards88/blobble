import React from "react";
import packageJson from "../../package.json";

export default function Rules({setDisplay}) {
  return (
    <div className="App rules">
      <h1 id="rulesHeader">How to play</h1>
      <p className="rulesText">
        {`Swipe the letters to form words that match a given shape. (Shapes cannot be rotated.)`}
      </p>
      <p className="rulesText">
        {`In the example below, GAME, MAGE, and FELT are all valid. LEFT is invalid because the letters cannot be joined with a swipe. LEAF is invalid because it would rotate the shape.`}
      </p>
      <div id="rulesDemo"></div>
      <p className="rulesText">
        {`Tap on a shape to reveal the next letter in the word.`}
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
