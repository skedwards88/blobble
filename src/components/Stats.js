import React from "react";

export default function Stats({stats, setDisplay}) {
  return (
    <div className="App stats">
      <div>
        {"TODO"}
      </div>

      <small>{`Stats are stored locally on your device/browser.`}</small>
      <button
        className="close"
        id="statsClose"
        onClick={() => setDisplay("daily")}
      >
        CLOSE
      </button>
    </div>
  );
}
